import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Next.js Codemods</h1>
            
Next.js предоставляет преобразования Codemod, чтобы помочь обновить кодовую базу Next.js, когда функция устарела.
<p>
Codemods - это преобразования, которые выполняются в вашей кодовой базе программно. Это позволяет применять большое количество изменений без необходимости вручную просматривать каждый файл.
</p>

<h2>Использование</h2>

npx @next/codemod {`<transform>`} {`<path>`}

<p className="list"> - transform - имя преобразования, см. доступные преобразования ниже.</p>
<p className="list"> - path - файлы или каталог для преобразования</p>
<p className="list"> - --dry Сделайте пробный прогон, код редактироваться не будет</p>
<p className="list"> - --print Печатает измененный вывод для сравнения</p>

<h2>Next.js 9</h2>
<h3>name-default-component</h3>

Преобразует анонимные компоненты в именованные компоненты, чтобы обеспечить их работу с функцией быстрого обновления .
<p>Например</p>


<Highlight language="javascript">
{`// my-component.js
export default function () {
  return <div>Hello World</div>
}`}
</Highlight>

Превращается в:

<Highlight language="javascript">
{`// my-component.js
export default function MyComponent() {
  return <div>Hello World</div>
}`}
</Highlight>

Компонент будет иметь имя в верблюжьем регистре, основанное на имени файла, и он также работает со стрелочными функциями.

<h4>использование</h4>
Перейти к вашему проекту

<Highlight language="javascript">
{`cd path-to-your-project/`}
</Highlight>

Запускаем codemod:

<Highlight language="node">
{`npx @next/codemod name-default-component`}
</Highlight>

<h3>withamp-to-config</h3>

Преобразует withAmpHOC в конфигурацию 9 страницы Next.js.
<p>Например:</p>


<Highlight language="javascript">
{`// Before
import { withAmp } from 'next/amp'

function Home() {
  return <h1>My AMP Page</h1>
}

export default withAmp(Home)`}
</Highlight>

<Highlight language="javascript">
{`// After
export default function Home() {
  return <h1>My AMP Page</h1>
}

export const config = {
  amp: true,
}`}
</Highlight>

<h4>использование</h4>

Перейти к вашему проекту

<Highlight language="javascript">
{`cd path-to-your-project/`}
</Highlight>

Запускаем codemod:

<Highlight language="javascript">
{`npx @next/codemod withamp-to-config`}
</Highlight>

<h2>Next.js 6</h2>
<h3>url-to-withrouter</h3>

Преобразует устаревшее автоматически внедренное urlсвойство на страницах верхнего уровня в использование withRouterи routerсвойство, которое оно внедряет. Подробнее здесь: err.sh/next.js/url-deprecated
<p>Например:</p>


<Highlight language="javascript">
{`// From
import React from 'react'
export default class extends React.Component {
  render() {
    const { pathname } = this.props.url
    return <div>Current pathname: {pathname}</div>
  }
}`}
</Highlight>

<Highlight language="javascript">
{`// To
import React from 'react'
import { withRouter } from 'next/router'
export default withRouter(
  class extends React.Component {
    render() {
      const { pathname } = this.props.router
      return <div>Current pathname: {pathname}</div>
    }
  }
)`}
</Highlight>

Это всего лишь один случай. Все кейсы, которые были преобразованы (и протестированы), можно найти в __testfixtures__каталоге .

<h3>использование</h3>

Перейти к вашему проекту

<Highlight language="javascript">
{`cd path-to-your-project/`}
</Highlight>

Запускаем codemod:
<Highlight language="javascript">
{`npx @next/codemod url-to-withrouter`}
</Highlight>

            </div>
        </Docs>
    )
}