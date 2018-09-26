
import React from "react";
import axios from "axios";
import Layout from '~/layout'
import List from "~/list";
import "./index.less";
import { Pagination } from "antd";

class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tagList: []
        };
    }
    static async getInitialProps() {
        try {
            const url = `${baseURL}/api/tag/list`;
            const res = await axios.get(url);
            return {
                articleList: res.data.data || []
            };
        } catch (error) {
            console.log(error);
        }
        return {};
    }
    render() {
        const { articleList } = this.props;
        return (
            <Layout title="Fingal's Blog">
                <div className="primary">
                {
                    articleList.map((item) => {
                        return <List article={item} key={item.id}></List>
                    })
                }
                </div>
                <div className="fr">
                    <Pagination size="small" total={50} />
                </div>
            </Layout>
        );
    }
};

export default Home;
    