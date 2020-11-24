import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>getInitialProps</h1>

<div className="note">
    <strong>Рекомендуется:</strong> getStaticProps или getServerSideProps.
    <p>
        Если вы используете Next.js 9.3 или новее, мы рекомендуем использовать getStaticProps или getServerSideProps вместо getInitialProps.
    </p>
    <p>Эти новые методы выборки данных позволяют выбирать между статической генерацией и рендерингом на стороне сервера. Узнайте больше о документации по страницам и извлечению данных.</p>
</div>   

<span className="spanTag">getInitialProps</span> включает рендеринг на стороне сервера и позволяет выполнять начальное заполнение данных, что означает отправку страницы с данными, уже заполненными с сервера. Это особенно полезно для SEO.
<p></p>
<div className="note"><span className="spanTag">getInitialProps</span> отключит автоматическую статическую оптимизацию.</div>


<span className="spanTag">getInitialProps</span> - это async функция, которую можно добавить на любую страницу в виде файла <span className="spanTag">static method</span>. Взгляните на следующий пример:

<Highlight language="javascript">
{`function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page`}
</Highlight>

Или используя компонент класса:

<Highlight language="javascript">
{`import React from 'react'

class Page extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

  render() {
    return <div>Next stars: {this.props.stars}</div>
  }
}

export default Page`}
</Highlight>

<span className="spanTag">getInitialProps</span> используется для асинхронной выборки некоторых данных, которые затем заполняются props.
<p>Данные, возвращаемые из <span className="spanTag">getInitialProps</span>, сериализуются при рендеринге сервера, аналогично тому, как это JSON.stringify происходит. Убедитесь, что возвращенный объект <span className="spanTag">getInitialProps</span> является простым Object и не использует Date, Map или Set.</p>
При начальной загрузке страницы <span className="spanTag">getInitialProps</span> будет выполняться только на сервере. <span className="spanTag">getInitialProps</span> затем будет запускаться на клиенте при переходе к другому маршруту через <span className="spanTag">next/link</span> компонент или с помощью <span className="spanTag">next/router</span>.

<h2>Объект контекста</h2>

<span className="spanTag">getInitialProps</span> получает единственный вызываемый аргумент <span className="spanTag">context</span>, это объект со следующими свойствами:
<p className="list"> - <strong>pathname</strong> - Текущий маршрут. Это путь к странице /pages</p>
<p className="list"> - <strong>query</strong> - Раздел строки запроса URL-адреса, анализируемого как объект</p>
<p className="list"> - <strong>asPath</strong> - String фактического пути (включая запрос), отображаемого в браузере</p>
<p className="list"> - <strong>req</strong> - объект HTTP-запроса (только сервер)</p>
<p className="list"> - <strong>res</strong> - объект HTTP-ответа (только сервер)</p>
<p className="list"> - <strong>err</strong> - Объект ошибки, если во время рендеринга обнаружена какая-либо ошибка</p>

<h2>Предостережения</h2>

<p className="list"> - <span className="spanTag">getInitialProps</span> может не использоваться в детских компонентов, только в экспорте по умолчанию каждой страницы</p>
<p className="list"> - Если вы используете внутри только серверные модули <span className="spanTag">getInitialProps</span>, убедитесь, что импортировали их правильно, иначе это замедлит работу вашего приложения.</p>

<h2>TypeScript</h2>
Если вы используете TypeScript, вы можете использовать этот NextPage тип для функциональных компонентов:

<Highlight language="javascript">
{`import { NextPage } from 'next'

interface Props {
  userAgent?: string;
}

const Page: NextPage<Props> = ({ userAgent }) => (
  <main>Your user agent: {userAgent}</main>
)

Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default Page`}
</Highlight>

И для React.Component, вы можете использовать NextPageContext:

<Highlight language="javascript">
{`import React from 'react'
import { NextPageContext } from 'next'

interface Props {
  userAgent?: string;
}

export default class Page extends React.Component<Props> {
  static async getInitialProps({ req }: NextPageContext) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    const { userAgent } = this.props
    return <main>Your user agent: {userAgent}</main>
  }
}`}
</Highlight>


            </div>
        </Docs>
    )
}