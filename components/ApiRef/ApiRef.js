import useSWR from 'swr'
import sidebar from '../../styles/Sidebar.module.scss'
import List from '../List/List'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ApiRef() {
    const { data, error } = useSWR('/api/apiref', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <div >
            <h3>Справочник по API</h3>
            {
                data.map((p, i) => (<List key={i} lists={p} />))
            }
        </div>
    )
}