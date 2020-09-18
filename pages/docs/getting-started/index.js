import Docs from '../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
            <h1>Установка</h1>
<p>Добро пожаловать в документацию Next.js!</p>
<p>Если вы новичок в Next.js, мы рекомендуем вам начать с учебного курса.</p>
<p>Интерактивный курс с викторинами проведет вас через все, что вам нужно знать, чтобы использовать Next.js</p>
<p>Если у вас есть вопросы по поводу Next.js, вы всегда можете задать их нашему сообществу в обсуждениях GitHub.</p>




<h3>Системные Требования</h3>
<ul>
    <li>Node.js 10.13 или новее</li>
    <li>Поддерживаются MacOS, Windows (включая WSL) и Linux.</li>
</ul>




<h2>Настроить</h2>
<p>Мы рекомендуем создать новое приложение Next.js с использованием <span className="spanTag">create-next-app</span> , которое настраивает все автоматически. Чтобы создать проект, запустите:</p>

<Highlight language="node">
    {`  npx create-next-app
  # or
  yarn create next-app`}
</Highlight>
        
<p>После завершения установки следуйте инструкциям по запуску сервера разработки. Попробуйте отредактировать <span className="spanTag">pages/index.js</span> и посмотрите результат в своем браузере.</p>

Для получения дополнительной информации о том, как использовать <span className="spanTag">create-next-app</span>, вы можете просмотреть в разделе <span className="spanTag">Create Next App</span>

<h2>Ручная настройка</h2>
Установить next, react и react-dom в вашем проекте:

<Highlight language="node">
{`  npm install next react react-dom
  # or
  yarn add next react react-dom`}
</Highlight>
        

Откройте package.json и добавьте следующее scripts:

<Highlight language="json">
    {`"scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start"
      }`}
</Highlight>
           
Эти сценарии относятся к различным этапам разработки приложения:

<p><span className="spanTag">dev</span>- Запускает next dev, Next.js в режиме разработки</p>
<p><span className="spanTag">build</span>- Запускает next build, сборку приложения для производственного использования.</p>
<p><span className="spanTag">start</span>- Запускает next start, производственный сервер Next.js</p>


Next.js построен на концепции страниц . Страница представляет собой компонент экспортированный из <span className='spanTag'>.js</span>, <span className='spanTag'>.jsx</span>, <span className='spanTag'>.ts</span> или <span className='spanTag'>.tsx</span> файла в <span className='spanTag'>pages</span> каталоге.

<p>Страницы связаны с маршрутом на основе имени файла. Например <span className="spanTag">pages/about.js</span>, отображается на <span className="spanTag">/about</span>. Вы даже можете добавить параметры динамического маршрута с именем файла.</p>

Создайте pages каталог внутри вашего проекта.

Заполните <span className="spanTag">./pages/index.js</span> следующим содержанием:

<Highlight language="javascript">
{`function HomePage() {
    return <div>Welcome to Next.js!</div>
}
export default HomePage`}
</Highlight>

Чтобы начать разработку вашего приложения, запустите <span className="spanTag">npm run dev</span> или <span className="spanTag">yarn dev</span>. Это запустит сервер разработки <span className="spanTag">http://localhost:3000</span>.
<p>Посетите, <span className="spanTag">http://localhost:3000</span> чтобы просмотреть ваше приложение.</p>


Итак, получаем:
<p> - Автоматическая компиляция и комплектация (с webpack и babel)</p>
<p> - Быстрое реагирование на обновления</p>
<p> - Статическая генерация и рендеринг на стороне сервера <span className="spanTag">./pages/</span></p>
<p> - Раздача статических файлов. <span className="spanTag">./public/</span> отображается на <span className="spanTag">/</span></p>




Кроме того, любое приложение Next.js готово к работе с самого начала, подробнее читайте в нашей документации по развертыванию .
        
            </div>
        </Docs>
    )
}