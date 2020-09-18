import Docs from '../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
        <h1>Развертывание</h1>
            
            <h2>Vercel (рекомендуется)</h2>

Самый простой способ развернуть Next.js в производственной среде - использовать платформу Vercel от создателей Next.js. Vercel - это универсальная платформа с Global CDN, поддерживающая статическое развертывание и развертывание Jamstack, а также бессерверные функции.

<h3>Начиная</h3>

Если вы еще этого не сделали, отправьте свое приложение Next.js поставщику Git по вашему выбору: GitHub , GitLab или BitBucket . Ваш репозиторий может быть частным или публичным.

<p>Затем выполните следующие действия:</p>
    <p className='list'>1. Зарегистрируйтесь в Vercel (кредитная карта не требуется).</p>
    <p className='list'>2. После регистрации вы попадете на страницу «Импорт проекта» . В разделе «Из репозитория Git» выберите поставщика Git, который вы используете, и настройте интеграцию. (Инструкции: GitHub / GitLab / BitBucket ).</p>
    <p className='list'>3. После настройки нажмите «Импортировать проект из…» и импортируйте приложение Next.js. Он автоматически определяет, что ваше приложение использует Next.js, и настраивает конфигурацию сборки за вас. Не нужно ничего менять - все должно работать нормально!</p>
    <p className='list'>4. После импорта он развернет ваше приложение Next.js и предоставит вам URL-адрес развертывания. Нажмите «Посетить», чтобы увидеть ваше приложение в разработке.</p>

<p>Поздравляю! Вы только что развернули приложение Next.js! Если у вас есть вопросы, взгляните на документацию Vercel .</p>

<div className="note">
Если вы используете собственный сервер , мы настоятельно рекомендуем выполнить миграцию с него (например, с помощью динамической маршрутизации ). Если вы не можете выполнить миграцию, рассмотрите другие варианты хостинга .

</div>

<h3>DPS: Develop, Preview, Ship</h3>
Давайте поговорим о рабочем процессе, который мы рекомендуем использовать. Vercel поддерживает то , что мы называем DPS рабочего процесса: D evelop, P обзор, и S бедра:

<p className='list'>
 - <strong>Разработка:</strong> напишите код в Next.js. Не прекращайте работу сервера разработки и воспользуйтесь преимуществами React Fast Refresh.
</p>
<p className='list'>
 - <strong>Предварительный просмотр:</strong> каждый раз, когда вы отправляете изменения в ветку на GitHub / GitLab / BitBucket, Vercel автоматически создает новое развертывание с уникальным URL-адресом. Вы можете просмотреть их на GitHub при открытии запроса на вытягивание или в разделе «Предварительный просмотр развертываний» на странице вашего проекта на Vercel.
</p>
<p className='list'>
 - <strong>Доставка:</strong> Когда вы будете готовы к отправке, объедините запрос на перенос с веткой по умолчанию (например master). Vercel автоматически создаст производственное развертывание.
</p>
Используя рабочий процесс DPS , вы можете не только выполнять обзоры кода , но и выполнять предварительные просмотры развертывания . Каждое развертывание создает уникальный URL-адрес, который можно использовать совместно или для интеграционных тестов.

<h3>Оптимизирован для Next.js</h3>

Vercel сделан создателями Next.js и имеет поддержку первого класса для Next.js.
<p>Например, гибридные страницы полностью поддерживаются из коробки.</p>
<p className="list">
 - Каждая страница может использовать статическую генерацию или рендеринг на стороне сервера.
</p>
<p className="list">
 - Страницы, использующие статическую генерацию и ресурсы (JS, CSS, изображения, шрифты и т. Д.), Будут автоматически обслуживаться из пограничной сети Vercel , что невероятно быстро.
</p>
<p className="list">
 - Страницы, использующие рендеринг на стороне сервера и маршруты API , автоматически становятся изолированными бессерверными функциями. Это позволяет бесконечно масштабировать рендеринг страниц и запросы API.
</p>

<h3>Пользовательские домены, переменные среды, автоматический HTTPS и др.</h3>
<p className="list">
 - <strong>Пользовательские домены:</strong> после развертывания на Vercel вы можете назначить пользовательский домен своему приложению Next.js. Взгляните на нашу документацию здесь .
</p>
<p className="list">
 - <strong>Переменные среды:</strong> вы также можете установить переменные среды на Vercel. Взгляните на нашу документацию здесь . Затем вы можете использовать эти переменные среды в своем приложении Next.js.
</p>
<p className="list">
 - <strong>Автоматический HTTPS:</strong> HTTPS включен по умолчанию (включая пользовательские домены) и не требует дополнительной настройки. Мы автоматически обновляем сертификаты SSL.
</p>
<p className="list">
 - <strong>Подробнее:</strong> прочтите нашу документацию, чтобы узнать больше о платформе Vercel.
</p>

<h2>Другие варианты хостинга</h2>
<h3>Сервер Node.js</h3>

Next.js можно развернуть на любом хостинг-провайдере, поддерживающем Node.js. Это подход, который вам следует использовать, если вы используете собственный сервер .
<p>Убедитесь, что ваш package.json имеет "build" и "start" скрипты:</p>



<Highlight language="json">
    {`{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}`}
</Highlight>

next build создает производственное приложение в .next папке. После сборки next start запускает сервер Node.js, который поддерживает гибридные страницы, обслуживая как статически сгенерированные, так и отображаемые на стороне сервера страницы.

            </div>
        </Docs>
    )
}

