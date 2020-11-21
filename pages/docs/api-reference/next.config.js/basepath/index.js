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

Чтобы развернуть приложение Next.js на подпутье домена, вы можете использовать параметр basePath конфигурации.
<p>
basePath позволяет вам установить префикс пути для приложения. Например, чтобы использовать /docs вместо /(по умолчанию), откройте next.config.js и добавьте basePath конфигурацию:
</p>

<Highlight language="javascript">
{`module.exports = {
  basePath: '/docs',
}`}
</Highlight>

<h2>Ссылки</h2>

При компоновке на другие страницы с использованием next/link и будут автоматически применяться .next/routerbasePath
<p>Например, использование /about автоматически станет, /docs/about если basePath установлено значение /docs.</p>


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

Это гарантирует, что вам не придется изменять все ссылки в вашем приложении при изменении basePathзначения.
            </div>
        </Docs>
    )
}
