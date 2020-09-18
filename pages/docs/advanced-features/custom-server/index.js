import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Пользовательский сервер</h1>
            
<p>
Обычно следующий сервер запускается с расширением next start. Однако возможно запустить сервер на 100% программно, чтобы использовать собственные шаблоны маршрутов.
</p>
<div className="note">
Пользовательский сервер не может быть развернут на Vercel , для которой была создана платформа Next.js.
</div>
<div className="note">
Прежде чем принять решение об использовании собственного сервера, имейте в виду, что его следует использовать только в том случае, если встроенный маршрутизатор Next.js не соответствует требованиям вашего приложения. Пользовательский сервер удалит важные оптимизации производительности, такие как бессерверные функции и автоматическая статическая оптимизация .
</div>
<p>Взгляните на следующий пример настраиваемого сервера:</p>


<Highlight language="node">
{`// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass 'true' as the second argument to 'url.parse'.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})`}
</Highlight>

<div className="note">
server.js не проходит через babel или webpack. Убедитесь, что синтаксис и источники, необходимые для этого файла, совместимы с текущей версией вашего узла.
</div>
<p>
Затем, чтобы запустить собственный сервер вам необходимо обновить scripts и package.json, например, так:
</p>

<Highlight language="json">
{`"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}`}
</Highlight>

Пользовательский сервер использует следующий импорт для подключения сервера к приложению Next.js:

<Highlight language="node">
{`const next = require('next')
const app = next({})`}
</Highlight>
<hr/>
Вышеупомянутый nextимпорт - это функция, которая получает объект со следующими параметрами:

<p className="list">
 - dev: Boolean- Запускать Next.js в режиме разработки или нет. По умолчанию false
</p>
<p className="list">
 - dir: String- Расположение проекта Next.js. По умолчанию'.'
</p>
<p className="list">
 - quiet: Boolean- Скрыть сообщения об ошибках, содержащие информацию о сервере. По умолчаниюfalse
</p>
<p className="list">
 - conf: object- Тот же объект, который вы использовали бы в next.config.js . По умолчанию{}
</p>
Затем возвращенные данные appможно использовать, чтобы Next.js обрабатывал запросы по мере необходимости.

<h2>Отключение маршрутизации файловой системы</h2>

По умолчанию Next будет обслуживать каждый файл в pagesпапке под именем, совпадающим с именем файла. Если в вашем проекте используется настраиваемый сервер, такое поведение может привести к тому, что один и тот же контент будет обслуживаться по разным путям, что может вызвать проблемы с SEO и UX.
<p>
Чтобы отключить это поведение и предотвратить маршрутизацию на основе файлов pages, откройте next.config.js и отключите useFileSystemPublicRoutes конфигурацию:
</p>

<Highlight language="node">
{`module.exports = {
  useFileSystemPublicRoutes: false,
}`}
</Highlight>


<div className="note">
Обратите внимание, что useFileSystemPublicRoutes отключает маршруты имен файлов из SSR; маршрутизация на стороне клиента может по-прежнему обращаться к этим путям. При использовании этой опции вам следует принять меры против навигации по маршрутам, которые вам не нужны программно.
</div>
<div className="note">
Вы также можете настроить маршрутизатор на стороне клиента, чтобы запретить перенаправление на стороне клиента на маршруты к именам файлов; для этого обратитесь к router.beforePopState.
</div>

            </div>
        </Docs>
    )
}