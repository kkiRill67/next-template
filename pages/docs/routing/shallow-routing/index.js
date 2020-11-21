import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Мелкая маршрутизация</h1>

Малая маршрутизация позволяет изменить URL без повторного запуска выборки данных методов, который включает в себя <span className="spanTag">getServerSideProps</span>, <span className="spanTag">getStaticProps</span> и <span className="spanTag">getInitialProps</span>.
<p>
Вы получите обновленное <span className="spanTag">pathname</span> и <span className="spanTag">query</span> через <span className="spanTag">router</span> объект (добавленный <span className="spanTag">useRouter</span> или <span className="spanTag">withRouter</span>) без потери состояния.
</p>

Чтобы включить неглубокую маршрутизацию, установите для <span className="spanTag">shallow</span> параметра значение <span className="spanTag">true</span>. Рассмотрим следующий пример:

<Highlight language="javascript">
    {`import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Current URL is '/'
function Page() {
  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=10', undefined, { shallow: true })
  }, [])

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}

export default Page`}
</Highlight>

URL-адрес будет обновлен до <span className="spanTag">/?counter=10</span> и страница не будет заменена, будет меняется только состояние маршрута.
<p>
Вы также можете следить за изменениями URL-адресов, <span className="spanTag">componentDidUpdate</span> как показано ниже:
</p>

<Highlight language="javascript">
    {`componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  // verify props have changed to avoid an infinite loop
  if (query.counter !== prevProps.router.query.counter) {
    // fetch data based on the new query
  }
}`}
</Highlight>

<h2>Предостережения</h2>

Неглубокая маршрутизация работает только при изменении URL одной и той же страницы. Например, предположим, что у нас есть другая страница <span className="spanTag">pages/about.js</span>, и вы запускаете ее:
<Highlight language="javascript">
    {`router.push('/?counter=10', '/about?counter=10', { shallow: true })`}
</Highlight>

Поскольку это новая страница, она выгружает текущую страницу, загружает новую и ожидает выборки данных, даже если мы просили выполнить неглубокую маршрутизацию.
            </div>
        </Docs>
    )
}