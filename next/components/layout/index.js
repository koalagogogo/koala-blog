import React from "react";
import Aside from "~/common/aside";
import Head from 'next/head'
import axios from "axios";
import "./index.less";
import "@/css/common.less";
const menu = [
    {
        label: "home",
        name: "首页",
        link: "/index",
        icon: "home",
    }, {
        label: "file",
        name: "归档",
        link: "/file",
        icon: "profile",
    }, {
        label: "about",
        name: "关于我",
        link: "/about",
        icon: "user",
    }
];
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu,
            tagList: []
        };
    }
    async componentDidMount () {
        try {
            // baseUrl webpack
            const res = await axios.get("http://127.0.0.1:3000/api/tag/list");
            this.setState({
                tagList: res.data.data || []
            });
        } catch (error) {
            console.log(error);
        }
    }
    render(){
        const { title, children } = this.props;
        const { tagList, menu } = this.state;
        return (
            <div>
                <Head>
                <title>{ title }</title>
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                </Head>
                <Aside menu={menu} tagList={tagList} />

                { children }

                <footer>
                {'I`m here to stay'}
                </footer>
            </div>
        );
    }
};

export default Layout;
