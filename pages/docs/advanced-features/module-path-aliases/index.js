import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Абсолютный импорт и псевдонимы пути к модулю</h1>
            
Next.js автоматически поддерживает параметры <span className="spanTag">tsconfig.json</span> и <span className="spanTag">jsconfig.json</span> "paths" и "baseUrl", начиная с Next.js 9.4.
<p></p>
<div className="note">
 Примечание: <span className="spanTag">jsconfig.json</span> можно использовать, когда вы не используете TypeScript   
</div>


Эта опция позволяет вам настраивать псевдонимы модулей, например, общий шаблон - это псевдонимы определенных каталогов для использования абсолютных путей.
<p>
Одна из полезных функций этих опций заключается в том, что они автоматически интегрируются в определенные редакторы, например, vscode.
</p>

Опция <span className="spanTag">baseUrl</span> конфигурации позволяет вам импортировать прямо из корня проекта.

<p>Пример такой конфигурации:</p>


<Highlight language="json">
{`// tsconfig.json or jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}`}
</Highlight>

<Highlight language="javascript">
{`// components/button.js
export default function Button() {
  return <button>Click me</button>
}`}
</Highlight>

<Highlight language="javascript">
{`// pages/index.js
import Button from 'components/button'

export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  )
}`}
</Highlight>

Хотя <span className="spanTag">baseUrl</span> это полезно, вы можете захотеть добавить другие псевдонимы, которые не соответствуют 1 на 1. Для этого TypeScript есть "paths" опция.

<p>
Использование "paths" позволяет настраивать псевдонимы модулей. Например, <span className="spanTag">@/components/*</span> чтобы <span className="spanTag">components/*</span>.
</p>

Пример такой конфигурации:

<Highlight language="json">
{`// tsconfig.json or jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}`}
</Highlight>

<Highlight language="javascript">
{`// components/button.js
export default function Button() {
  return <button>Click me</button>
}`}
</Highlight>

<Highlight language="javascript">
{`// pages/index.js
import Button from '@/components/button'

export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  )
}`}
</Highlight>

            </div>
        </Docs>
    )
}