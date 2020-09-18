import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
            <h1>Встроенная поддержка CSS</h1>

Next.js позволяет импортировать файлы CSS из файла JavaScript. Это возможно, потому что Next.js расширяет концепцию importJavaScript.

<h2>Добавление глобальной таблицы стилей</h2>
Чтобы добавить таблицу стилей в приложение, импортируйте файл CSS в pages/_app.js.

<p>Например, рассмотрим следующую таблицу стилей с именем styles.css:</p>

<Highlight language="css">
  {`body {
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}`}
</Highlight>
        

Создайте pages/_app.jsфайл, если он еще не существует. Затем файл.importstyles.css

<Highlight language="javascript">
  {`import '../styles.css'

// This default export is required in a new 'pages/_app.js' file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}`}
</Highlight>

<p>
Эти стили ( styles.css) будут применяться ко всем страницам и компонентам вашего приложения. Из-за глобального характера таблиц стилей и во избежание конфликтов вы можете импортировать их только внутри pages/_app.js .
</p>
<p>
В процессе разработки такое представление таблиц стилей позволяет загружать стили в горячем режиме по мере их редактирования, что означает, что вы можете сохранить состояние приложения.
</p>
<p>
В процессе производства все файлы CSS будут автоматически объединены в один минифицированный .css файл.
</p>

<h3>Импортировать стили из node_modules</h3>

Если вы хотите импортировать файлы CSS из node_modules, вы должны сделать это внутри pages/_app.js.

<h2>Добавление CSS на уровне компонентов</h2>
<p>
Next.js поддерживает модули CSS, используя [name].module.css соглашение об именах файлов.
</p>
<p>
Модули CSS локально охватывают CSS, автоматически создавая уникальное имя класса. Это позволяет использовать одно и то же имя класса CSS в разных файлах, не беспокоясь о коллизиях.
</p>
<p>
Такое поведение делает модули CSS идеальным способом включения CSS на уровне компонентов. Файлы модуля CSS можно импортировать в любое место вашего приложения.
</p>
<p>
Например, рассмотрим повторно используемый Button компонент в components/ папке:
</p>

Сначала создайте components/Button.module.css со следующим содержимым:

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


Затем создайте components/Button.js, импортируйте и используйте указанный выше файл CSS:

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
Модули CSS являются дополнительной функцией и доступны только для файлов с .module.css расширением. {`<link>`} По-прежнему поддерживаются обычные таблицы стилей и глобальные файлы CSS.
</p>
<p>
При производстве все файлы модуля CSS будут автоматически объединены во множество минифицированных файлов и .css файлов с разделением кода. Эти .cssфайлы представляют собой горячие пути выполнения в вашем приложении, обеспечивая загрузку минимального количества CSS для вашего приложения для рисования.
</p>

<h2>Поддержка Sass</h2>
<p>
Next.js позволяет импортировать Sass с использованием как .scss и .sass расширений. Вы можете использовать Sass на уровне компонентов через модули CSS и расширение .module.scss или .module.sass.
</p>
<p>
Прежде чем вы сможете использовать встроенную поддержку Sass в Next.js, обязательно установите sass:
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
Если вы хотите настроить компилятор Sass, вы можете сделать это с помощью sassOptions in next.config.js.
</p>
Например, чтобы добавить includePaths:

<Highlight language="node">
{`const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}`}
</Highlight>
        
<h2>Меньше и поддержка стилуса</h2>
<p>
Для поддержки импорта .less или .styl файлов, которые вы можете использовать следующие плагин:
</p>
<p className='list'> - @ zeit / next-less</p>
<p className='list'> - @ zeit / следующий-стилус</p>



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
Мы связываем styled-jsx, чтобы обеспечить поддержку CSS с изолированной областью видимости. Цель состоит в том, чтобы поддерживать «теневой CSS», аналогичный веб-компонентам, которые, к сожалению, не поддерживают рендеринг на сервере и предназначены только для JS.
</p>
<p>
См. Приведенные выше примеры для других популярных решений CSS-in-JS (например, стилизованных компонентов).
</p>
<p>
Компонент с использованием styled-jsx выглядит так:
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
       

<p>
Пожалуйста, обратитесь к документации в стиле-JSX для большего количества примеров.
</p>

<h2>Вопросы-Ответы</h2>

Работает ли он с отключенным JavaScript?
Да, если вы отключите JavaScript, CSS все равно будет загружен в производственную сборку (next start). Во время разработки мы требуем, чтобы JavaScript был включен, чтобы обеспечить максимальное удобство для разработчиков с помощью Fast Refresh .
            </div>
        </Docs>
    )
}