import { withRouter } from "next/router"
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

const Details = ({ pid }) => {
    return (
        <div>
            Page: {pid}
        </div>
    )
}

export async function getStaticPaths() {
    return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
    const { pid } = params;

    try {
        //const { data } = await ArticleAPI.get(pid);
        return {
            props: {
                pid,
            },
            revalidate: 1,
        };
    } catch (error) {
        return {
            props: {
                article: {},
                pid,
            },
            revalidate: 1,
        };
    }
}

export default Details;