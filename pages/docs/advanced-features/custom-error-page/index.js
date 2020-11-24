import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1> Пользовательская страница ошибки</h1>
           <h2>Страница 404</h2>
Страница 404 может быть доступна очень часто. Отображение сервером страницы с ошибкой при каждом посещении увеличивает нагрузку на сервер Next.js. Это может привести к увеличению затрат и замедлению работы.

<p>
Чтобы избежать вышеуказанных ошибок, Next.js по умолчанию предоставляет статическую страницу 404 без необходимости добавлять какие-либо дополнительные файлы.
</p>

<h3>Настройка страницы 404</h3>

Чтобы создать собственную страницу 404, вы можете создать <span className="spanTag">pages/404.js</span> файл. Этот файл статически создается во время сборки.

<Highlight language="javascript">
{`// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}`}
</Highlight>

<h2>Страница 500</h2>
По умолчанию Next.js предоставляет страницу ошибок 500, которая соответствует стилю страницы 404 по умолчанию. Эта страница не оптимизирована статически, поскольку позволяет сообщать об ошибках на стороне сервера. Вот почему 404 и 500 (другие ошибки) разделены.

<h3>Настройка страницы ошибок</h3>

<span className="spanTag">Error</span> Компонент обрабатывает 500 ошибок как на стороне клиента, так и на стороне сервера. Если вы хотите переопределить его, определите файл <span className="spanTag">pages/_error.js</span> и добавьте следующий код:

<Highlight language="javascript">
{`function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? 'An error \${statusCode} occurred on server'
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error`}
</Highlight>

<div className="note">
<span className="spanTag">pages/_error.js</span> используется только в производстве. В процессе разработки вы получите ошибку в стеке вызовов, чтобы узнать, откуда возникла ошибка.
</div>

<h3>Повторное использование встроенной страницы ошибок</h3>

Если вы хотите отобразить встроенную страницу ошибки, вы можете импортировать <span className="spanTag">Error</span> компонент:

<Highlight language="javascript">
{`import Error from 'next/error'

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const errorCode = res.ok ? false : res.statusCode
  const json = await res.json()

  return {
    props: { errorCode, stars: json.stargazers_count },
  }
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return <div>Next stars: {stars}</div>
}`}
</Highlight>

<p>
<span className="spanTag">Error</span> Компонент также имеет <span className="spanTag">title</span> как свойство, если вы хотите передать в текстовом сообщении вместе с <span className="spanTag">statusCode</span>.
</p>

Если у вас есть настраиваемый <span className="spanTag">Error</span> компонент, обязательно импортируйте его. <span className="spanTag">next/error</span> экспортирует компонент по умолчанию, используемый Next.js.
            </div>
        </Docs>
    )
}