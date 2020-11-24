import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Статический экспорт HTML</h1>
           
<span className="spanTag">next export</span> позволяет экспортировать приложение в статический HTML, который можно запускать автономно без необходимости использования сервера Node.js.

<p>
Экспортированное приложение поддерживает почти все функции Next.js, включая динамические маршруты, предварительную выборку, предварительную загрузку и динамический импорт.
</p>

<span className="spanTag">next export</span> работает путем предварительной визуализации всех страниц в HTML. Для динамических маршрутов ваша страница может экспортировать <span className="spanTag">getStaticPaths</span> функцию, чтобы экспортер узнал, какие HTML-страницы генерировать для этого маршрута.
<p></p>
<div className="note">
<span className="spanTag">next export</span> предназначен для сценариев, в которых ни одна из ваших страниц не имеет требований к данным на стороне сервера или инкрементным данным (хотя статически отрисованные страницы все равно могут получать данные на стороне клиента).
<p>
Если вы хотите создать гибридный сайт, на котором только некоторые страницы предварительно обрабатываются в статическом HTML, Next.js уже сделает это автоматически! Прочтите об автоматической статической оптимизации, чтобы узнать подробности.
</p>
<span className="spanTag">next export</span> также вызывает отключение таких функций, как добавочная статическая генерация и регенерация, если они требуют, <span className="spanTag">next start</span> или бессерверное развертывание для работы.
</div>

<h2>Как это использовать</h2>

Разрабатывайте свое приложение, как обычно, с Next.js. Затем запустите:

<Highlight language="node">
{`next build && next export`}
</Highlight>

Для этого вы можете обновить скрипты в своем package.json:

<Highlight language="json">
{`"scripts": {
  "build": "next build && next export"
}`}
</Highlight>

И запустите его с помощью:

<Highlight language="node">
{`npm run build`}
</Highlight>

<p>Тогда у вас будет статическая версия вашего приложения в каталоге out.</p>

По умолчанию <span className="spanTag">next export</span> не требует настройки. Он будет выводить статический HTML-файл для каждой страницы в вашем каталоге <span className="spanTag">pages</span> (или более для динамических маршрутов, где он будет вызывать <span className="spanTag">getStaticPaths</span> и генерировать страницы в зависимости от результата). Для более сложных сценариев вы можете определить параметр, вызываемый <span className="spanTag">exportPathMap</span> в вашем <span className="spanTag">next.config.js</span> файле, чтобы точно настроить, какие страницы будут создаваться.

<h2>Развертывание</h2>

По умолчанию <span className="spanTag">next export</span> создается out каталог, который может обслуживаться любой службой статического хостинга или CDN.
<p></p>
<div className="note">
Мы настоятельно рекомендуем использовать Vercel, даже если ваше приложение Next.js полностью статично. Vercel оптимизирован, чтобы делать статические приложения Next.js невероятно быстрыми. <span className="spanTag">next export</span> работает с развертываниями Zero Config на Vercel.
</div>

<h2>Предостережения</h2>

 - С помощью <span className="spanTag">next export</span> мы создаем HTML-версию вашего приложения. Во время экспорта мы вызываем <span className="spanTag">getStaticProps</span> каждую страницу, которая ее экспортирует, и передаем результат компоненту страницы. <span className="spanTag">getInitialProps</span> Вместо этого также можно использовать более старый API <span className="spanTag">getStaticProps</span>, но с некоторыми оговорками:

<p className="list">
 - <span className="spanTag">getInitialProps</span> не может использоваться рядом <span className="spanTag">getStaticProps</span> или <span className="spanTag">getStaticPaths</span> на любой странице. Если у вас есть динамические маршруты, вместо использования <span className="spanTag">getStaticPaths</span> вам необходимо настроить <span className="spanTag">exportPathMap</span> параметр в <span className="spanTag">next.config.js</span> файле, чтобы экспортер знал, какие файлы HTML он должен выводить.
</p>
<p className="list">
 - Когда <span className="spanTag">getInitialProps</span> вызывается во время экспорта, поля <span className="spanTag">req</span> и <span className="spanTag">res</span> его <span className="spanTag">context</span> параметра будут пустыми объектами, так как во время экспорта сервер не работает.
</p>
<p className="list">
 - <span className="spanTag">getInitialProps</span> будет вызываться при каждой навигации на стороне клиента, если вы хотите получать данные только во время сборки, переключитесь на <span className="spanTag">getStaticProps</span>.
</p>
<p className="list">
 - <span className="spanTag">getInitialProps</span> должен извлекаться из API и не может использовать библиотеки, специфичные для Node.js, или файловую систему, например <span className="spanTag">getStaticProps</span>.
</p>
По возможности рекомендуется использовать и переходить на <span className="spanTag">getStaticProps</span> более <span className="spanTag">getInitialProps</span> высокий уровень.
<p>
 - <span className="spanTag">fallback: true</span> Режим <span className="spanTag">getStaticPaths</span> не поддерживается при использовании <span className="spanTag">next export</span>.
</p>

 - Маршруты API не поддерживаются этим методом, потому что они не могут быть предварительно преобразованы в HTML.
<p>
 - <span className="spanTag">getServerSideProps</span> не может использоваться на страницах, потому что для этого метода требуется сервер. Рассмотрите возможность использования <span className="spanTag">getStaticProps</span> вместо этого.
</p>
            </div>
        </Docs>
    )
}