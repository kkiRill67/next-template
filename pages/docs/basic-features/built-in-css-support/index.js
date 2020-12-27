import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
            <h1>Встроенная поддержка CSS</h1>

Next.js позволяет импортировать файлы CSS из файла JavaScript. Это возможно, потому что Next.js расширяет концепцию importJavaScript.

<h2>Добавление глобальной таблицы стилей</h2>
Чтобы добавить таблицу стилей в приложение, импортируйте файл CSS в <span className="spanTag">pages/_app.js</span>.

<p>Например, рассмотрим следующую таблицу стилей с именем <span className="spanTag">styles.css</span>:</p>

<Highlight language="css">
  {`body {
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}`}
</Highlight>
        

Создайте <span className="spanTag">pages/_app.js</span> файл, если он еще не существует. Затем import <span className="spanTag">styles.css</span>

<Highlight language="javascript">
  {`import '../styles.css'

// This default export is required in a new 'pages/_app.js' file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}`}
</Highlight>

<p>
Эти стили (<span className="spanTag">styles.css</span>) будут применяться ко всем страницам и компонентам вашего приложения. Из-за глобального характера таблиц стилей и во избежание конфликтов вы можете импортировать их только внутри <span className="spanTag">pages/_app.js</span>.
</p>
<p>
В процессе разработки такое представление таблиц стилей позволяет загружать стили в горячем режиме по мере их редактирования, что означает, что вы можете сохранить состояние приложения.
</p>
<p>
В процессе производства все файлы CSS будут автоматически объединены в один минифицированный <span className="spanTag">.css</span> файл.
</p>

<h3>Импортировать стили из <span className="spanTag">node_modules</span></h3>

<p>Начиная с Next.js <strong>9.5.4</strong>, импорт файла CSS из <span className="spanTag">node_modules</span> разрешен в любом месте вашего приложения.</p>
Для глобальных таблиц стилей, таких как <span className="spanTag">bootstrap</span> или <span className="spanTag">nprogress</span>, вы должны импортировать файл внутри <span className="spanTag">pages/_app.js</span>. Например:

<Highlight language="javascript">
  {`// pages/_app.js
import 'bootstrap/dist/css/bootstrap.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}`}
</Highlight>

Для импорта CSS, необходимого для стороннего компонента, вы можете сделать это в своем компоненте. Например:

<Highlight language="javascript">
  {`// components/ExampleDialog.js
import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'

function ExampleDialog(props) {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <div>
      <button onClick={open}>Open Dialog</button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <p>Hello there. I am a dialog</p>
      </Dialog>
    </div>
  )
}`}
</Highlight>

<h2>Добавление CSS на уровне компонентов</h2>
<p>
Next.js поддерживает модули CSS, используя <span className="spanTag">[name].module.css</span> соглашение об именах файлов.
</p>
<p>
Модули CSS локально охватывают CSS, автоматически создавая уникальное имя класса. Это позволяет использовать одно и то же имя класса CSS в разных файлах, не беспокоясь об противоречиях.
</p>
<p>
Такое поведение делает модули CSS идеальным способом включения CSS на уровне компонентов. Файлы модуля CSS можно импортировать в любое место вашего приложения.
</p>
<p>
Например, рассмотрим повторно используемый <span className="spanTag">Button</span> компонент в папке <span className="spanTag">components/</span>:
</p>

Сначала создайте <span className="spanTag">components/Button.module.css</span> со следующим содержимым:

<Highlight language="css">
  {`/*
You do not need to worry about .error {} colliding with any other '.css' or
'.module.css' files!
*/
.error {
  color: white;
  background-color: red;
}`}
</Highlight>


Затем создайте <span className="spanTag">components/Button.js</span>, импортируйте и используйте указанный выше файл CSS:

<Highlight language="javascript">
{`import styles from './Button.module.css'

export function Button() {
  return (
    <button
      type="button"
      // Note how the "error" class is accessed as a property on the 
      // imported 'styles' object.
      className={styles.error}
    >
      Destroy
    </button>
  )
}`}
</Highlight>
        

<p>
Модули CSS являются дополнительной функцией и доступны только для файлов с расширением <span className="spanTag">.module.css</span>. Стандартные таблицы стилей <span className="spanTag">{`<link>`}</span> и глобальные файлы CSS по-прежнему поддерживаются.
</p>
<p>
При производстве все файлы модуля CSS будут автоматически объединены во множество минифицированных файлов и <span className="spanTag">.css</span> файлов с разделением кода. Эти <span className="spanTag">.css</span> файлы представляют собой горячие пути выполнения в вашем приложении, обеспечивая загрузку минимального количества CSS для отрисовки вашего приложения.
</p>

<h2>Поддержка Sass</h2>
<p>
Next.js позволяет импортировать Sass с использованием <span className="spanTag">.scss</span> и <span className="spanTag">.sass</span> расширений. Вы можете использовать Sass на уровне компонентов через модули CSS и расширение <span className="spanTag">.module.scss</span> или <span className="spanTag">.module.sass</span>.
</p>
<p>
Прежде чем вы сможете использовать встроенную поддержку Sass в Next.js, обязательно установите <span className="spanTag">sass</span>:
</p>

<Highlight language="node">
  {`npm install sass`}
</Highlight>


<p>
Поддержка Sass имеет те же преимущества и ограничения, что и встроенная поддержка CSS, описанная выше.
</p>

<div className='note'>
<strong>Примечание:</strong> Sass поддерживает два разных синтаксиса, каждый со своим расширением. .scss расширение требует использовать синтаксис SCSS, в то время как .sass расширение требует использовать углубленный синтаксис ( «Sass»).
<p>
Если вы не уверены, что выбрать, начните с .scss расширения, которое является надмножеством CSS и не требует изучения синтаксиса с отступом («Sass»).
</p>
</div>

<h3>Настройка параметров Sass</h3>

<p>
Если вы хотите настроить компилятор Sass, вы можете сделать это с помощью <span className="spanTag">sassOptions</span> в <span className="spanTag">next.config.js</span>.
</p>
Например, чтобы добавить <span className="spanTag">includePaths</span>:

<Highlight language="node">
{`const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}`}
</Highlight>
        
<h2>Less и Stylus поддержка</h2>
<p>
Для поддержки импорта <span className="spanTag">.less</span> или <span className="spanTag">.styl</span> файлов, вы можете использовать следующие плагины:
</p>
<p className='list'> - @zeit/next-less</p>
<p className='list'> - @zeit/next-stylus</p>



Если вы используете плагин less, не забудьте добавить зависимость и от less, иначе вы увидите сообщение об ошибке:

<Highlight language="javascript">
  {`Error: Cannot find module 'less'`}
</Highlight>
        

<h2>CSS-in-JS</h2>
Можно использовать любое существующее решение CSS-in-JS. Самый простой - встроенные стили:

<Highlight language="javascript">
{`function HiThere() {
  return <p style={{ color: 'red' }}>hi there</p>
}
export default HiThere`}
</Highlight>
        

<p>
Мы связываем <span className="spanTag">styled-jsx</span>, чтобы обеспечить поддержку CSS с изолированной областью видимости. Цель состоит в том, чтобы поддерживать «теневой CSS», аналогичный веб-компонентам, которые, к сожалению, не поддерживают рендеринг на сервере и предназначены только для JS.
</p>
<p>
См. Приведенные выше примеры для других популярных решений CSS-in-JS (например, стилизованных компонентов).
</p>
<p>
Компонент с использованием <span className="spanTag">styled-jsx</span> выглядит так:
</p>

<Highlight language="javascript">
 {`function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{\`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      \`}</style>
      <style global jsx>{\`
        body {
          background: black;
        }
      \`}</style>
    </div>
  )
}

export default HelloWorld`}
</Highlight>

<h2>Вопросы-Ответы</h2>

Работает ли он с отключенным JavaScript?
Да, если вы отключите JavaScript, CSS все равно будет загружен в производственную сборку (<span className="spanTag">next start</span>). Во время разработки мы требуем, чтобы JavaScript был включен, чтобы обеспечить максимальное удобство для разработчиков с помощью быстрого обновления.
            </div>
        </Docs>
    )
}