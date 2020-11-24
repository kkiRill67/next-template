import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>next/head</h1>
Мы предоставляем встроенный компонент для добавления элементов к <span className="spanTag">head</span> странице:

<Highlight language="javascript">
{`import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage`}
</Highlight>

Чтобы избежать дублирования тегов в вашем, <span className="spanTag">head</span> вы можете использовать <span className="spanTag">key</span> свойство, которое обеспечит отображение тега только один раз, как в следующем примере:

<Highlight language="javascript">
{`import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage`}
</Highlight>

В этом случае {`<meta property="og:title" />`} рендерится только второй. <span className="spanTag">meta</span> теги с повторяющимися <span className="spanTag">name</span> атрибутами обрабатываются автоматически.
<p></p>
<div className="note">Содержимое <span className="spanTag">head</span> очищается после размонтирования компонента, поэтому убедитесь, что каждая страница полностью определяет то, что ей нужно <span className="spanTag">head</span>, не делая предположений о том, какие другие страницы были добавлены.</div>


<span className="spanTag">title</span>, metaили любые другие элементы (например script) должны содержаться как прямые дочерние <span className="spanTag">Head</span> элементы элемента или быть заключены в {`<React.Fragment>`} массивы максимум на один уровень - иначе теги не будут правильно выбраны при навигации на стороне клиента.
            </div>
        </Docs>
    )
}