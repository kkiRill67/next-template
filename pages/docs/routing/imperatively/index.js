import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Императивно</h1>

next/link должен быть в состоянии покрыть большую часть ваших потребностей в маршрутизации, но вы также можете выполнять навигацию на стороне клиента без него, ознакомьтесь с документацией для next/router .

<p>
В следующем примере показано, как выполнять базовую навигацию по страницам с помощью useRouter:
</p>

<Highlight language="javascript">
    {`import { useRouter } from 'next/router'

function ReadMore() {
  const router = useRouter()

  return (
    <span onClick={() => router.push('/about')}>
        Click here to read more
    </span>
  )
}

export default ReadMore`}
</Highlight>

            </div>
        </Docs>
    )
}