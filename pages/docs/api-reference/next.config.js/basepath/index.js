import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Базовый путь</h1>
<div className="note">
Эта функция была представлена ​​в Next.js 9.5 и новее. Если вы используете более старые версии Next.js, обновите его, прежде чем пробовать.
</div>

Чтобы развернуть приложение Next.js на подпутье домена, вы можете использовать параметр <span className="spanTag">basePath</span> конфигурации.
<p>
<span className="spanTag">basePath</span> позволяет вам установить префикс пути для приложения. Например, чтобы использовать <span className="spanTag">/docs</span> вместо <span className="spanTag">/</span>(по умолчанию), откройте next.config.js и добавьте <span className="spanTag">basePath</span> конфигурацию:
</p>

<Highlight language="javascript">
{`module.exports = {
  basePath: '/docs',
}`}
</Highlight>

<h2>Ссылки</h2>

При компоновке на другие страницы с использованием <span className="spanTag">next/link</span> и будут автоматически применяться <span className="spanTag">.next/routerbasePath</span>
<p>Например, использование <span className="spanTag">/about</span> автоматически станет, <span className="spanTag">/docs/about</span> если <span className="spanTag">basePath</span> установлено значение <span className="spanTag">/docs</span>.</p>


<Highlight language="javascript">
{`export default function HomePage() {
  return (
    <>
      <Link href="/about">
        <a>About Page</a>
      </Link>
    </>
  )
}`}
</Highlight>

html на выходе:

<Highlight language="html">
{`<a href="/docs/about">About Page</a>`}
</Highlight>

Это гарантирует, что вам не придется изменять все ссылки в вашем приложении при изменении <span className="spanTag">basePath</span> значения.
            </div>
        </Docs>
    )
}
