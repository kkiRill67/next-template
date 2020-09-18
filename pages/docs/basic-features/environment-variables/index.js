import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Переменное окружение</h1>
                <div className='note'>
                Этот документ предназначен для Next.js версий 9.4 и выше. Если вы используете старую версию Next.js, обновите или обратитесь к переменным среды в next.config.js.
                </div>

<p>
Next.js имеет встроенную поддержку переменных среды, которая позволяет вам делать следующее:
</p>

<p className='list'>
 - Используйте .env.local для загрузки переменных среды
</p>
<p className='list'>
 - Предоставить браузеру переменные среды 
</p>

<h2>Загрузка переменных среды</h2>

Next.js имеет встроенную поддержку для загрузки переменных среды из .env.local в process.env.
<p>Пример .env.local:</p>

<Highlight language="node">
{`DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword`}
</Highlight>

<p>
Это загружает process.env.DB_HOST, process.env.DB_USER и process.env.DB_PASS в среду Node.js автоматически, позволяя вам использовать их в методах выборки данных Next.js и маршрутах API.
</p>

Например, используя getStaticProps:

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
    <strong>Примечание.</strong>Next.js автоматически расширит переменные ( $VAR) внутри ваших .env* файлов. Это позволяет вам ссылаться на другие секреты, например:

 
<Highlight language="node">
{`# .env
HOSTNAME=localhost
PORT=8080
HOST=http://$HOSTNAME:$PORT`}
</Highlight>

Если вы пытаетесь использовать переменную с $ в реальной стоимости, он должен быть экранирован так: \$.

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
По умолчанию все загруженные переменные среды .env.local доступны только в среде Node.js, то есть они не будут доступны браузеру.
</p>
<p>
Чтобы открыть переменную браузеру, вы должны поставить перед переменной префикс NEXT_PUBLIC_. Например:
</p>

<Highlight language="node">
    {`NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk`}
</Highlight>

Это process.env.NEXT_PUBLIC_ANALYTICS_IDавтоматически загружается в среду Node.js. Позволяя вам использовать его в любом месте вашего кода. Значение будет встроено в JavaScript, отправленный в браузер из-за NEXT_PUBLIC_префикса.

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
Обычно .env.local нужен только один файл. Однако иногда вам может потребоваться добавить некоторые значения по умолчанию для среды development( next dev) или production( next start).
</p>
<p>
Next.js позволяет вам установить значения по умолчанию для .env(всех сред), .env.development(среда разработки) и .env.production(производственная среда).
</p>
<p>
.env.local всегда отменяет установленные по умолчанию.
</p>

<div className='note'>
    <strong>Примечание:</strong> .env, .env.development и .env.production файлы должны быть включены в хранилище , поскольку они определяют по умолчанию. .env*.local должны быть добавлены .gitignore, поскольку эти файлы предназначены для игнорирования. .env.local здесь можно хранить секреты.
</div>

<h2>Переменные среды на Vercel</h2>

<p>
При развертывании на Vercel вы можете настроить секреты в разделе « Переменные среды » проекта на панели инструментов Vercel.
</p>
<p>
Вы все еще можете использовать .env, .env.development и .env.production добавить по умолчанию.
</p>
<p>
Если вы настроили переменные среды разработки, вы можете .env.local использовать их на локальном компьютере с помощью следующей команды:
</p>

<Highlight language="node">
    {`vercel env pull .env.local`}
</Highlight>

<h2>Переменные тестовой среды</h2>
<p>
Помимо development и production среды, есть третий вариант доступен: test. Таким же образом вы можете установить значения по умолчанию для среды разработки или производства, вы можете сделать то же самое с .env.test файлом для среды тестирования (хотя этот не так распространен, как два предыдущих).
</p>
<p>
Это полезно при запуске тестов с такими инструментами, как jest или cypress когда вам нужно установить определенные переменные среды только для целей тестирования. Значения теста по умолчанию будут загружены, если NODE_ENV установлено значение test, хотя обычно вам не нужно делать это вручную, поскольку инструменты тестирования решат это за вас.
</p>
<p>
Существует небольшая разница между test окружающей средой, и как development и production что вы должны иметь в виду: .env.local не будет загружен, как вы ожидаете тесты дают одинаковые результаты для всех. Таким образом, каждое выполнение теста будет использовать одни и те же значения по умолчанию для разных исполнений, игнорируя ваш .env.local(который предназначен для переопределения набора по умолчанию).
</p>
<div className="note">
    <strong>Примечание:</strong> аналогично переменным среды по умолчанию, .env.test файл должен быть включен в ваш репозиторий, но .env.test.local не должен, поскольку .env*.local предполагается, что он будет проигнорирован .gitignore.
</div>
            </div>
        </Docs>
    )
}