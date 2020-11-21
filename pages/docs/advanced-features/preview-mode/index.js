import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Режим предварительного просмотра</h1>
            <div className="note">
            Этот документ предназначен для Next.js версий 9.3 и выше. Если вы используете более старые версии Next.js, обратитесь к предыдущей документации.
            </div>

В документации <span className="spanTag">Страниц</span> и документации <span className="spanTag">Получение данных</span>, мы говорили о том, как предварительно отобразить страницу во время сборки с использованием <span className="spanTag">getStaticProps</span> и <span className="spanTag">getStaticPaths</span>.

<p>
Статическая генерация полезна, когда ваши страницы получают данные из автономной CMS. Однако это не идеально, когда вы пишете черновик на своей автономной CMS и хотите предварительно просмотреть черновик на своей странице. Вы бы хотели, чтобы Next.js отображал эти страницы во время запроса, а не во время сборки, и получал черновик контента вместо опубликованного контента. Вы бы хотели, чтобы Next.js обходил статическую генерацию только в этом конкретном случае.
</p>

В Next.js есть функция <span className="spanTag">Preview Mode</span>, которая решает эту проблему. Вот инструкции по его использованию.

<h2>Шаг 1. Создайте предварительный маршрут API и получите доступ к нему.</h2>
<div className="note">Посмотрите на документацию по API Маршрутов первым , если вы не знакомы с API маршрутов Next.js.</div>
<p>
Сначала создайте предварительный маршрут API. Он может иметь любое имя - например <span className="spanTag">pages/api/preview.js</span> (или <span className="spanTag">.ts</span> при использовании TypeScript).
</p>


В этом маршруте API вам нужно вызвать <span className="spanTag">setPreviewData</span> объект ответа. Аргументом для <span className="spanTag">setPreviewData</span> должен быть объект, и он может использоваться <span className="spanTag">getStaticProps</span>(подробнее об этом позже). Пока мы будем использовать {`{}`}.

<Highlight language="javascript">
{`export default (req, res) => {
  // ...
  res.setPreviewData({})
  // ...
}`}
</Highlight>

<p>
<span className="spanTag">res.setPreviewData</span> устанавливает некоторые файлы <span className="spanTag">cookie</span> в браузере, что включает режим предварительного просмотра. Любые запросы к Next.js, содержащие эти файлы <span className="spanTag">cookie</span>, будут рассматриваться как режим предварительного просмотра, а поведение статически сгенерированных страниц изменится (подробнее об этом позже).
</p>

Вы можете проверить это вручную, создав маршрут API, как показано ниже, и открыв его вручную из браузера:

<Highlight language="node">
{`// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then
// open /api/preview from your browser.
export default (req, res) => {
  res.setPreviewData({})
  res.end('Preview mode enabled')
}`}
</Highlight>

Если вы используете инструменты разработчика вашего браузера, вы заметите, что <span className="spanTag">__prerender_bypass</span> и <span className="spanTag">__next_preview_data</span> cookie будут установлены по этому запросу.

<h3>Безопасный доступ к нему с вашей Headless CMS</h3>

На практике, вы хотите вызвать этот API маршрут надежно с вашего обезглавленного CMS. Конкретные шаги будут зависеть от того, какую безголовую CMS вы используете, но вот некоторые общие шаги, которые вы можете предпринять.
<p>
Эти шаги предполагают, что используемая вами CMS без головы поддерживает настройку пользовательских URL-адресов предварительного просмотра. Если это не так, вы все равно можете использовать этот метод для защиты URL-адресов предварительного просмотра, но вам нужно будет создать URL-адрес предварительного просмотра и получить к нему доступ вручную.
</p>

Во-первых, вы должны создать секретную строку токенов, используя выбранный вами генератор токенов. Этот секрет будет известен только вашему приложению Next.js и вашей автономной CMS. Этот секрет предотвращает доступ людей, не имеющих доступа к вашей CMS, к URL-адресам предварительного просмотра.

<p>
Во-вторых, если ваша CMS без головы поддерживает настройку пользовательских URL-адресов предварительного просмотра, укажите в качестве URL-адреса предварительного просмотра следующее. (Предполагается, что ваш маршрут предварительного просмотра API находится по адресу <span className="spanTag">pages/api/preview.js</span>.)
</p>

<Highlight language="html">
{`https://<your-site>/api/preview?secret=<token>&slug=<path>`}
</Highlight>

<p className="list"> - {`<your-site>`} должен быть вашим доменом развертывания.</p>
<p className="list"> - {`<token>`} следует заменить на созданный вами секретный токен.</p>
<p className="list"> - {`<path>`} должен быть путем к странице, которую вы хотите просмотреть. Если вы хотите выполнить предварительный просмотр <span className="spanTag">/posts/foo</span>, вам следует использовать <span className="spanTag">&slug=/posts/foo</span>.</p>



Ваша автономная CMS может позволить вам включить переменную в URL-адрес предварительного просмотра, чтобы ее <span className="spanTag">{`<path>`}</span> можно было динамически устанавливать на основе данных CMS, например: <span className="spanTag">&slug=/posts/{`{entry.fields.slug}`}</span>

<p>Наконец, в маршруте предварительного просмотра API:</p>

<p className="list"> - Убедитесь, что секрет совпадает и <span className="spanTag">slug</span> параметр существует (в противном случае запрос должен завершиться ошибкой).</p>
<p className="list"> - Звоните <span className="spanTag">res.setPreviewData</span>.</p>
<p className="list"> - Затем перенаправьте браузер на путь, указанный в <span className="spanTag">slug</span>. (В следующем примере используется перенаправление 307).</p>

<Highlight language="node">
{`export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided 'slug' exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostBySlug(req.query.slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(post.slug)
}`}
</Highlight>

В случае успеха браузер будет перенаправлен на путь, который вы хотите просмотреть, с установленными файлами <span className="spanTag">cookie</span> режима предварительного просмотра.

<h2>Шаг 2. Обновить <span className="spanTag">getStaticProps</span></h2>

Следующим шагом будет обновление <span className="spanTag">getStaticProps</span> для поддержки режима предварительного просмотра.
<p>
Если вы запрашиваете страницу, на которой установлены <span className="spanTag">getStaticProps</span> файлы <span className="spanTag">cookie</span> в режиме предварительного просмотра (через <span className="spanTag">res.setPreviewData</span>), она <span className="spanTag">getStaticProps</span> будет вызываться во время запроса (а не во время сборки).
</p>

Кроме того, он будет вызываться с context объектом, где:
<p className="list"> - <span className="spanTag">context.preview</span> будет true.</p>
<p className="list"> - <span className="spanTag">context.previewData</span> будет таким же, как и аргумент, используемый для <span className="spanTag">setPreviewData</span>.</p>


<Highlight language="javascript">
{`export async function getStaticProps(context) {
  // If you request this page with the preview mode cookies set:
  //
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for 'setPreviewData'.
}`}
</Highlight>


Мы использовали <span className="spanTag">res.setPreviewData({`{}`})</span> маршрут API предварительного просмотра, так <span className="spanTag">context.previewData</span> и будет {`{}`}. Вы можете использовать это, чтобы при необходимости передать информацию о сеансе из маршрута предварительного просмотра API <span className="spanTag">getStaticProps</span>.
<p>Если вы тоже используете <span className="spanTag">getStaticPaths</span>, то context.paramsтоже будет доступно.</p>

<h3>Получить данные предварительного просмотра</h3>

Вы можете обновить, <span className="spanTag">getStaticProps</span> чтобы получить разные данные на основе <span className="spanTag">context.preview</span> и/или <span className="spanTag">context.previewData</span>.
<p>
Например, ваша CMS без головы может иметь другую конечную точку API для черновиков сообщений. Если это так, вы можете использовать <span className="spanTag">context.preview</span> для изменения URL-адреса конечной точки API, как показано ниже:
</p>

<Highlight language="javascript">
{`export async function getStaticProps(context) {
  // If context.preview is true, append "/preview" to the API endpoint
  // to request draft data instead of published data. This will vary
  // based on which headless CMS you're using.
  const res = await fetch('https://.../\${context.preview} ? 'preview' : ''}')
  // ...
}`}
</Highlight>

Это оно! Если вы обращаетесь к маршруту предварительного просмотра API (с помощью <span className="spanTag">secret</span> и <span className="spanTag">slug</span>) из вашей автономной CMS или вручную, вы должны теперь увидеть содержимое предварительного просмотра. А если вы обновите черновик без публикации, вы сможете предварительно просмотреть черновик.

<Highlight language="node">
{`# Set this as the preview URL on your headless CMS or access manually,
# and you should be able to see the preview.
https://<your-site>/api/preview?secret=<token>&slug=<path>`}
</Highlight>

<h2>Подробнее</h2>
<h3>Очистить файлы <span className="spanTag">cookie</span> режима предварительного просмотра</h3>
<p>
По умолчанию для файлов <span className="spanTag">cookie</span> режима предварительного просмотра не установлен срок действия, поэтому режим предварительного просмотра завершается при закрытии браузера.
</p>
Чтобы очистить файлы <span className="spanTag">cookie</span> предварительного просмотра вручную, вы можете создать маршрут API, который вызывает <span className="spanTag">clearPreviewData</span> и затем получает доступ к этому маршруту API.

<Highlight language="javascript">
{`export default (req, res) => {
  // Clears the preview mode cookies.
  // This function accepts no arguments.
  res.clearPreviewData()
  // ...
}`}
</Highlight>

<h3>Укажите продолжительность режима предварительного просмотра</h3>

<span className="spanTag">setPreviewData</span> принимает необязательный второй параметр, который должен быть объектом параметров. Он принимает следующие ключи:
<p className="list">
 - <span className="spanTag">maxAge</span>: Указывает количество (в секундах), в течение которого будет длиться сеанс предварительного просмотра.
</p>

<Highlight language="javascript">
{`setPreviewData(data, {
  maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
})`}
</Highlight>

<h3><span className="spanTag">previewData</span> ограничения по размеру</h3>

Вы можете передать объект, <span className="spanTag">setPreviewData</span> и он будет доступен в <span className="spanTag">getStaticProps</span>. Однако, поскольку данные будут храниться в файле <span className="spanTag">cookie</span>, существует ограничение на размер. В настоящее время размер данных предварительного просмотра ограничен 2 КБ.

<h3>Работает с <span className="spanTag">getServerSideProps</span></h3>

Также работает режим предварительного просмотра <span className="spanTag">getServerSideProps</span>. Он также будет доступен для <span className="spanTag">context</span> объекта, содержащего <span className="spanTag">preview</span> и <span className="spanTag">previewData</span>.

<h3>Работает с маршрутами API</h3>

Маршруты API будут иметь доступ к объекту запроса <span className="spanTag">preview</span> и <span className="spanTag">previewData</span> под ним. Например:

<Highlight language="javascript">
{`export default function myApiRoute(req, res) {
  const isPreview = req.preview
  const previewData = req.previewData
  // ...
}`}
</Highlight>

<h3>Уникальный на next build</h3>

Оба значения <span className="spanTag">cookie</span> и закрытый ключ для шифрования <span className="spanTag">previewData</span> измениются по завершении сборки <span className="spanTag">next build</span>. Это гарантирует, что обходной файл <span className="spanTag">cookie</span> не будет угадан.
            </div>
        </Docs>
    )
}