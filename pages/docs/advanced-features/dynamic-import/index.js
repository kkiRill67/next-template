import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Динамический импорт</h1>
            
Next.js поддерживает динамическийimport() ES2020 для JavaScript. С его помощью вы можете динамически импортировать модули JavaScript и работать с ними. Они также работают с SSR.
<p>В следующем примере мы реализуем нечеткий поиск с использованием fuse.jsи загружаем модуль только динамически в браузере после того, как пользователь вводит поисковый запрос:</p>

<Highlight language="javascript">
{`import { useState } from 'react'

const names = ['Tim', 'Joe', 'Bel', 'Max', 'Lee']

export default function Page() {
  const [results, setResults] = useState()

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default
          const fuse = new Fuse(names)

          setResults(fuse.search(value))
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}`}
</Highlight>


<p>Вы можете думать о динамическом импорте как о еще одном способе разбить код на управляемые части.</p>
Компоненты React также можно импортировать с помощью динамического импорта, но в этом случае мы используем его вместе с, next/dynamicчтобы убедиться, что он работает так же, как любой другой компонент React. Ознакомьтесь с разделами ниже, чтобы узнать больше о том, как это работает.

<h2>Основное использование</h2>

В следующем примере модуль ../components/helloбудет динамически загружен страницей:

<Highlight language="javascript">
{`import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/hello'))

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>HOME PAGE is here!</p>
    </div>
  )
}

export default Home`}
</Highlight>

DynamicComponent будет компонентом по умолчанию, возвращаемым ../components/hello. Он работает как обычный компонент React, и вы можете передавать ему свойства, как обычно.

<h2>С именованным экспортом</h2>

Если динамический компонент не является экспортом по умолчанию, вы также можете использовать именованный экспорт. Рассмотрим модуль ../components/hello.jsс именованным экспортом Hello:

<Highlight language="javascript">
{`export function Hello() {
  return <p>Hello!</p>
}`}
</Highlight>

Чтобы динамически импортировать Hello компонент, вы можете вернуть его из обещания, возвращенного функциейimport() , например:

<Highlight language="javascript">
{`import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() =>
  import('../components/hello').then((mod) => mod.Hello)
)

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>HOME PAGE is here!</p>
    </div>
  )
}

export default Home`}
</Highlight>

<h2>С настраиваемым компонентом загрузки</h2>

Необязательный loadingкомпонент может быть добавлен для визуализации состояния загрузки во время загрузки динамического компонента. Например:

<Highlight language="javascript">
{`import dynamic from 'next/dynamic'

const DynamicComponentWithCustomLoading = dynamic(
  () => import('../components/hello'),
  { loading: () => <p>...</p> }
)

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  )
}

export default Home`}
</Highlight>

<h2>Без SSR</h2>

Возможно, вы не всегда хотите включать модуль на стороне сервера. Например, когда модуль включает библиотеку, которая работает только в браузере.
<p>Взгляните на следующий пример:</p>

<Highlight language="javascript">
{`import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/hello3'),
  { ssr: false }
)

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponentWithNoSSR />
      <p>HOME PAGE is here!</p>
    </div>
  )
}

export default Home`}
</Highlight>

            </div>
        </Docs>
    )
}