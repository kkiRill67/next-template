import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>next/head</h1>
Мы предоставляем встроенный компонент для добавления элементов к headстранице:

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

Чтобы избежать дублирования тегов в вашем, headвы можете использовать keyсвойство, которое обеспечит отображение тега только один раз, как в следующем примере:

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

В этом случае {`<meta property="og:title" />`} рендерится только второй . metaтеги с повторяющимися nameатрибутами обрабатываются автоматически.
<p></p>
<div className="note">Содержимое head очищается после размонтирования компонента, поэтому убедитесь, что каждая страница полностью определяет то, что ей нужно head, не делая предположений о том, какие другие страницы были добавлены.</div>


title, metaили любые другие элементы (например script) должны содержаться как прямые дочерние Headэлементы элемента или быть заключены в {`<React.Fragment>`}массивы максимум на один уровень - иначе теги не будут правильно выбраны при навигации на стороне клиента.
            </div>
        </Docs>
    )
}