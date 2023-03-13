import {menu,create} from "../../data/allMenu";
import AllMenuItem from "./AllMenuItem";

const AllMenu = () => {
  return (
    <div className='all_menu'>
        <div className="all_menu_header">Menu</div>
        <div className="all_menu_wrap scrollbar">
            <div className="all_menu_left">
                <div className="all_menu_search">
                    <i className="amm_s_ic"></i>
                    <input type="text" placeholder="Search Menu"/>
                </div>
                <div className="all_menu_group">
                    <div className="all_menu_group_header">Social</div>
                    {menu.slice(0,6).map((item, index)=>(
                            <AllMenuItem key={index} item={item}/>
                        ))
                    }
                </div>
                <div className="all_menu_group">
                    <div className="all_menu_group_header">Entertainments</div>
                    {menu.slice(6,9).map((item, index)=>(
                            <AllMenuItem key={index} item={item}/>
                        ))
                    }
                </div>
                <div className="all_menu_group">
                    <div className="all_menu_group_header">Shopping</div>
                    {menu.slice(9,11).map((item, index)=>(
                            <AllMenuItem key={index} item={item}/>
                        ))
                    }
                </div>
                <div className="all_menu_group">
                    <div className="all_menu_group_header">Personal</div>
                    {menu.slice(11,17).map((item, index)=>(
                            <AllMenuItem key={index} item={item}/>
                        ))
                    }
                </div>
                <div className="all_menu_group">
                    <div className="all_menu_group_header">Community Resources</div>
                    {menu.slice(17,21).map((item, index)=>(
                            <AllMenuItem key={index} item={item}/>
                        ))
                    }
                </div>
                <div className="all_menu_group">
                    <div className="all_menu_group_header">Communication Resources</div>
                    {menu.slice(21,23).map((item, index)=>(
                            <AllMenuItem key={index} item={item}/>
                        ))
                    }
                </div>
            </div>

            <div className="all_right">
                <div className="all_right_header">Create</div>
                {create.map((item, index)=>(
                    <div className="all_right_item hover1" key={index}>
                        <div className="all_right_circle">
                            <i className={item.icon}></i>
                        </div>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>

        </div>
    </div>
  )
}

export default AllMenu;