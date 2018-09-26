import { Card, Icon } from "antd";
import Link from "next/link";

export default (props) => {
    return (
        <div style={{ background: '#ECECEC', marginBottom: 30 }}>
            <Card title={props.article.title} bordered={false} >
                <p>
                    <span>{ props.article.desc }</span>
                </p>
                <Link href={`/article/${props.article.id}`}>
                    <a>
                        查看更多<Icon type="double-right"/>
                    </a>
                </Link>
            </Card>
        </div>
    );
};