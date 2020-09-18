import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Мелкая маршрутизация</h1>

Малая маршрутизация позволяет изменить URL без повторного запуска выборки данных методов, который включает в себя getServerSideProps, getStaticPropsи getInitialProps.
<p>
Вы получите обновленное pathname и query через routerобъект (добавленный useRouterили withRouter) без потери состояния.
</p>

Чтобы включить неглубокую маршрутизацию, установите для shallowпараметра значение true. Рассмотрим следующий пример:

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

URL-адрес будет обновлен до /?counter=10. и страница не будет заменена, меняется только состояние маршрута.
<p>
Вы также можете следить за изменениями URL-адресов, componentDidUpdate как показано ниже:
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

Неглубокая маршрутизация работает только при изменении URL одной и той же страницы. Например, предположим, что у нас есть другая страница pages/about.js, и вы запускаете ее:
<Highlight language="javascript">
    {`router.push('/?counter=10', '/about?counter=10', { shallow: true })`}
</Highlight>

Поскольку это новая страница, она выгружает текущую страницу, загружает новую и ожидает выборки данных, даже если мы просили выполнить неглубокую маршрутизацию.
            </div>
        </Docs>
    )
}