import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Переменное окружение</h1>
                <div className='note'>
                Этот документ предназначен для Next.js версий 9.4 и выше. Если вы используете старую версию Next.js, обновите или обратитесь к переменным среды в <span className="spanTag">next.config.js</span>.
                </div>

<p>
Next.js имеет встроенную поддержку переменных среды, которая позволяет вам делать следующее:
</p>

<p className='list'>
 - Использовать <span className="spanTag">.env.local</span> для загрузки переменных среды
</p>
<p className='list'>
 - Предоставить браузеру переменные среды 
</p>

<h2>Загрузка переменных среды</h2>

Next.js имеет встроенную поддержку для загрузки переменных среды из <span className="spanTag">.env.local</span> в <span className="spanTag">process.env</span>.
<p>Пример <span className="spanTag">.env.local</span>:</p>

<Highlight language="node">
{`DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword`}
</Highlight>

<p>
Это загружает <span className="spanTag">process.env.DB_HOST</span>, <span className="spanTag">process.env.DB_USER</span> и <span className="spanTag">process.env.DB_PASS</span> в среду Node.js автоматически, позволяя вам использовать их в методах выборки данных Next.js и маршрутах API.
</p>

Например, используя <span className="spanTag">getStaticProps</span>:

<Highlight language="javascript">
    {`// pages/index.js
export async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  // ...
}`}
</Highlight>

<div className='note'>
    <strong>Примечание.</strong>Next.js автоматически расширит переменные (<span className="spanTag">$VAR</span>) внутри ваших <span className="spanTag">.env*</span> файлов. Это позволяет вам ссылаться на другие секреты, например:

 
<Highlight language="node">
{`# .env
HOSTNAME=localhost
PORT=8080
HOST=http://$HOSTNAME:$PORT`}
</Highlight>

Если вы пытаетесь использовать переменную с <span className="spanTag">$</span> в фактическом значении, он должен быть экранирован так: <span className="spanTag">\$</span>.

Например:

<Highlight language="node">
{`# .env
A=abc
WRONG=pre$A # becomes "preabc"
CORRECT=pre\$A # becomes "pre$A"`}
</Highlight>

</div>

<h2>Предоставление браузеру переменных среды</h2>
<p>
По умолчанию все загруженные переменные среды <span className="spanTag">.env.local</span> доступны только в среде Node.js, то есть они не будут доступны браузеру.
</p>
<p>
Чтобы открыть переменную браузеру, вы должны поставить перед переменной префикс <span className="spanTag">NEXT_PUBLIC_</span>. Например:
</p>

<Highlight language="node">
    {`NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk`}
</Highlight>

Это автоматически загружает <span className="spanTag">process.env.NEXT_PUBLIC_ANALYTICS_ID</span> в среду Node.js. Позволяя вам использовать его в любом месте вашего кода. Значение будет встроено в JavaScript, отправленный в браузер из-за <span className="spanTag">NEXT_PUBLIC_</span> префикса.

<Highlight language="javascript">
    {`// pages/index.js
import setupAnalyticsService from '../lib/my-analytics-service'

// NEXT_PUBLIC_ANALYTICS_ID can be used here as it's prefixed by NEXT_PUBLIC_
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)

function HomePage() {
  return <h1>Hello World</h1>
}

export default HomePage`}
</Highlight>


<h2>Переменные среды по умолчанию</h2>
<p>
Обычно <span className="spanTag">.env.local</span> нужен только один файл. Однако иногда вам может потребоваться добавить некоторые значения по умолчанию для среды development(<span className="spanTag">next dev</span>) или production(<span className="spanTag">next start</span>).
</p>
<p>
Next.js позволяет вам установить значения по умолчанию для <span className="spanTag">.env</span>(всех сред), <span className="spanTag">.env.development</span>(среда разработки) и <span className="spanTag">.env.production</span>(среда продакшена).
</p>
<p>
<span className="spanTag">.env.local</span> всегда отменяет установленные по умолчанию.
</p>

<div className='note'>
    <strong>Примечание:</strong> <span className="spanTag">.env</span>, <span className="spanTag">.env.development</span> и <span className="spanTag">.env.production</span> файлы должны быть включены в хранилище, поскольку они определяются по умолчанию. <span className="spanTag">.env*.local</span> должны быть добавлены <span className="spanTag">.gitignore</span>, поскольку эти файлы предназначены для игнорирования. <span className="spanTag">.env.local</span> здесь можно хранить секреты.
</div>

<h2>Переменные среды на Vercel</h2>

<p>
При развертывании на Vercel вы можете настроить секреты в разделе «Переменные среды» проекта на панели инструментов Vercel.
</p>
<p>
Вы все еще можете использовать <span className="spanTag">.env</span>, <span className="spanTag">.env.development</span> и <span className="spanTag">.env.production</span> добавить по умолчанию.
</p>
<p>
Если вы настроили переменные среды разработки, вы можете <span className="spanTag">.env.local</span> использовать их на локальном компьютере с помощью следующей команды:
</p>

<Highlight language="node">
    {`vercel env pull .env.local`}
</Highlight>

<h2>Переменные тестовой среды</h2>
<p>
Помимо <span className="spanTag">development</span> и <span className="spanTag">production</span> среды, доступен третий вариант :<span className="spanTag">test</span>. Таким же образом вы можете установить значения по умолчанию для среды разработки или производства, вы можете сделать то же самое с файлом <span className="spanTag">.env.test</span> для среды тестирования (хотя он не так распространен, как два предыдущих).
</p>
<p>
Это полезно при запуске тестов с такими инструментами, как <span className="spanTag">jest</span> или <span className="spanTag">cypress</span> когда вам нужно установить определенные переменные среды только для целей тестирования. Значения теста по умолчанию будут загружены, если <span className="spanTag">NODE_ENV</span> установлено значение <span className="spanTag">test</span>, хотя обычно вам не нужно делать это вручную, поскольку инструменты тестирования решат это за вас.
</p>
<p>
Существует небольшая разница между <span className="spanTag">test</span> средой, <span className="spanTag">development</span> и <span className="spanTag">production</span>, о которой вам нужно помнить: <span className="spanTag">.env.local</span> не будет загружен, поскольку вы ожидаете, что тесты будут давать одинаковые результаты для всех. Таким образом, каждое выполнение теста будет использовать одни и те же значения по умолчанию для разных исполнений, игнорируя ваш <span className="spanTag">.env.local</span>(который предназначен для переопределения набора по умолчанию).
</p>
<div className="note">
    <strong>Примечание:</strong> аналогично переменным среды по умолчанию, <span className="spanTag">.env.test</span> файл должен быть включен в ваш репозиторий, но <span className="spanTag">.env.test.local</span> не должен, поскольку <span className="spanTag">.env*.local</span> предполагается, что он будет проигнорирован <span className="spanTag">.gitignore</span>.
</div>
            </div>
        </Docs>
    )
}