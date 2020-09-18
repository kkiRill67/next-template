import Docs from '../../components/Docs/Docs'
import useSWR from 'swr'
import Post from '../../components/Post/Post'

const fetcher = (url) => fetch(url).then((res) => res.json())


export default function Index () {

    const { data, error } = useSWR('/api/list', fetcher)
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <div>
            <Docs>
                <Post />
            </Docs>
        </div>
    )
}