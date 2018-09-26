import { Fragment } from "react";
import { Icon, Tag, Menu } from "antd";
import Link from "next/link";
import "./index.less";

export default (props) => {
    
    const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue"];
    const { menu, tagList } = props;
    return (
        <Fragment>
            <div>
                <div className="avatar" />
                想在这里写登录
            </div>
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                >
                {
                    menu.map((item, index) => {
                        return (
                            <Menu.Item key={index}>
                                <Link href={item.link || "/index"}>
                                    <span className="nav-text"><Icon type={item.icon} />{item.name}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
            <div className="tag-list">
            {
                tagList.map(item => {
                    return <Tag key={item.tagId} color={ colors[Math.floor(Math.random() * 10)] }>{item.tagName}</Tag>
                })
            }
            </div>
        </Fragment>
    );
};
 