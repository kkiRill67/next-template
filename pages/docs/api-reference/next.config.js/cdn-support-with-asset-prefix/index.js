import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Поддержка CDN с префиксом актива</h1>
<div className="note">
Внимание: при развертывании на Vercel автоматически настраивается глобальный CDN для вашего проекта Next.js. Вам не нужно вручную настраивать префикс актива.
</div>       
<div className="note">
Примечание. В Next.js 9.5+ добавлена ​​поддержка настраиваемого базового пути, который лучше подходит для размещения вашего приложения на подпутье, например /docs. Мы не рекомендуем вам использовать настраиваемый префикс актива для этого варианта использования.
</div>

Чтобы настроить CDN , вы можете настроить префикс актива и настроить источник CDN для разрешения домена, на котором размещен Next.js.
<p>Открываем next.config.js и добавляем <span className="spanTag">assetPrefix</span> конфиг:</p>

<Highlight language="javascript">
{`const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
}`}
</Highlight>

Next.js будет автоматически использовать префикс вашего ресурса для файлов JavaScript и CSS, которые он загружает из пути <span className="spanTag">/_next/</span> ( .next/static/папки ).
<p>Поддержка префикса актива не влияет на следующие пути:</p>
<p className="list"> - Файлы в общей папке; если вы хотите обслуживать эти ресурсы через CDN, вам придется ввести префикс самостоятельно</p>
<p className="list"> - /_next/data/ запросы на <span className="spanTag">getServerSideProps</span> страницы. Эти запросы всегда будут направляться к основному домену, поскольку они не статичны.</p>
<p className="list"> - /_next/data/ запросы на <span className="spanTag">getStaticProps</span> страницы. Эти запросы всегда будут направляться к основному домену для поддержки инкрементной статической генерации, даже если вы ее не используете (для согласованности).</p>
            </div>
        </Docs>
    )
}