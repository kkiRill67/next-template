import useSWR from 'swr'
import {apiref} from '../../apiref'
import List from '../List/List'
import React, {useMemo} from 'react'

const fetcher = (url) => fetch(url).then((res) => res.json())

function ApiRef() {
    const { data, error } = useSWR('/api/apiref', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <div >
            <h3>Справочник по API</h3>
            {
                apiref.map((p, i) => (<List key={i} lists={p} />))
            }
        </div>
    )
}

export default React.memo(ApiRef)