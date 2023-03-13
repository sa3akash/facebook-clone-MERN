import React, { useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutSide from "../../helpers/OutsideClick";
import { useRef } from "react";
import { useEffect } from "react";
import { addToSearchHistry, getSearchHistry, removeSearchHistry, searchFriends } from "../../functions/user";
import { Link } from "react-router-dom";

const SearchMenu = ({ setShowSearchMenu,user }) => {
  const [iconVisible, setIconVisible] = useState(true);

  const [searchText,setSearchText] = useState('')
  const [searchData,setSearchData] = useState([])
  const [SearchHistory,setSearchHistory] = useState([])

  const inputFocus = useRef(null);

  const el = useRef(null);
  useClickOutSide(el, () => {
    setShowSearchMenu(false);
    setIconVisible(true);
  });

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const hangleAddSearch = async (id) => {
    await addToSearchHistry({searchUserId:id,token:user.token})
    setShowSearchMenu(false)
  }

  const getHistory = async () => {
    const {data} = await getSearchHistry({token:user.token})
    setSearchHistory(data)
  }
  useEffect(() => {
    getHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSearch = async (e) => {
    if(searchText === "") {
      getHistory()
      setSearchData([])
    }else{
     if(searchText.length > 3){
      setSearchHistory([])
      const res = await searchFriends({search:searchText,token:user.token})
      setSearchData(res.data)
     }
    }
  }
  
  const hangleSearchRemove = async (id) => {
   await removeSearchHistry({removeId:id,token:user.token})
   setSearchHistory(prev=>([...prev.filter((u)=>u.user._id !== id)]))
  }

  return (
    <div className="header_left search_area scroolbar" ref={el}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setShowSearchMenu(false)}
          >
            <Return color="#65676b" />
          </div>
        </div>
        <div className="search" onClick={() => inputFocus.current.focus()}>
          {iconVisible && (
            <div>
              <Search color="#65676b" />
            </div>
          )}

          <input
            type="text"
            placeholder="Search Facebook"
            ref={inputFocus}
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            onKeyUp={handleSearch}
          />
        </div>
      </div>
      {searchText === "" && <div className="hearch_history_header">
        <span>Recent Search</span>
        <span className="edit">Edit</span>
      </div>}
      <div className="search_history scrollbar">
      {SearchHistory && SearchHistory.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map((u,i)=>(
          <div className="search_profile_wrap hover1" key={i}>
            <Link to={`/profile/${u.user.username}`} onClick={()=>hangleAddSearch(u.user._id)}>
              <img src={u.user.picture} alt="avater" />
              <span>{u.user.first_name + " " + u.user.last_name}</span>
            </Link>
              <i className="exit_icon" onClick={()=>hangleSearchRemove(u.user._id)}></i>
          </div>
        ))}
      </div>
      <div className="search_results scrollbar">
        {searchData && searchData.map((u,i)=>(
          <Link to={`/profile/${u.username}`} key={i} className="search_profile_wrap hover1" onClick={()=>hangleAddSearch(u._id)}>
            <img src={u.picture} alt="avater" />
            <span>{u.first_name + " " + u.last_name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;
