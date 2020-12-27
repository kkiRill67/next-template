import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
            <h1>Компонент изображения и оптимизация изображения</h1>
            <p>Начиная с версии 10.0, Next.js имеет встроенный компонент изображения и автоматическую оптимизацию изображения.</p>
            Компонент изображения Next.js <span className="spanTag">next/image</span> - это расширение элемента HTML <span className="spanTag">{`<img>`}</span>, разработанное для современной сети.
            <p>
            Автоматическая оптимизация изображений позволяет изменять размер, оптимизировать и обслуживать изображения в современных форматах, таких как WebP, если браузер поддерживает это. Это позволяет избежать отправки больших изображений на устройства с меньшим окном просмотра. Он также позволяет Next.js автоматически принимать будущие форматы изображений и передавать их браузерам, поддерживающим эти форматы.
            </p>
            Автоматическая оптимизация изображения работает с любым источником изображения. Даже если изображение размещено во внешнем источнике данных, таком как CMS, его все равно можно оптимизировать.
            <p>
            Вместо оптимизации изображений во время сборки, Next.js оптимизирует изображения по запросу, когда их запрашивают пользователи. В отличие от генераторов статических сайтов и статических решений, время сборки не увеличивается, независимо от того, отправлено ли 10 изображений или 10 миллионов изображений.
            </p>
            По умолчанию изображения загружаются лениво. Это означает, что скорость вашей страницы не снижается из-за изображения вне области просмотра. Изображения загружаются по мере их прокрутки в окне просмотра.
            <p>
            Изображения всегда отображаются таким образом, чтобы избежать Cumulative Layout Shift, Core Web Vital, которые Google собирается использовать в поисковом рейтинге.
            </p>

            <h2>Компонент изображения</h2>

            Чтобы добавить изображение в приложение, импортируйте компонент <span className="spanTag">next/image</span>:

<Highlight language="javascript">{`import Image from 'next/image'
           function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

export default Home`}</Highlight>

<p>Просмотреть все свойства, доступные для компонента <span className="spanTag">next/image</span>.</p>

<h2>Конфигурация</h2>
В дополнение к использованию свойств, доступных для <span className="spanTag">next/image</span> компонента, вы можете дополнительно настроить оптимизацию изображений для более сложных случаев использования через next.config.js.

<h3>Домены</h3>

Чтобы включить "Оптимизацию изображений" для изображений, размещенных на внешнем веб-сайте, используйте абсолютный URL-адрес для изображения <span className="spanTag">src</span> и укажите, какие из <span className="spanTag">domains</span> можно оптимизмровать. Это необходимо для предотвращения злоупотребления внешними URL-адресами.
<Highlight language="javascript">{`module.exports = {
  images: {
    domains: ['example.com'],
  },
}`}</Highlight>

<h3>Загрузчик</h3>

Если вы хотите использовать облачного провайдера для оптимизации изображений вместо использования встроенной оптимизации изображений Next.js, вы можете настроить загрузчик и префикс пути. Это позволяет использовать относительные URL-адреса для изображения <span className="spanTag">src</span> и автоматически генерировать правильный абсолютный URL-адрес для вашего провайдера.


<Highlight language="javascript">{`module.exports = {
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
}`}</Highlight>

Поддерживаются следующие облачные провайдеры для оптимизации изображений:

<p className='list'> - Vercel: работает автоматически при развертывании на Vercel, настройка не требуется.</p>
<p className='list'> - Imgix: <span className="spanTag">loader: 'imgix'</span></p>
<p className='list'> - Cloudinary: <span className="spanTag">loader: 'cloudinary'</span></p>
<p className='list'> - Akamai: loader: <span className="spanTag">'akamai'</span></p>
<p className='list'> - По умолчанию: Работает автоматически <span className="spanTag">next dev</span>, <span className="spanTag">next start</span> или пользовательский сервер</p>

<h2>Кеширование</h2>
Ниже описан алгоритм кэширования для загрузчика по умолчанию. Для всех других загрузчиков обратитесь к документации вашего облачного провайдера.
<p>
Изображения оптимизируются динамически по запросу и сохраняются в каталоге <span className="spanTag">{`<distDir>`}/cache/images</span>. Оптимизированный файл изображения будет использоваться для последующих запросов, пока не истечет срок его действия. Когда делается запрос, соответствующий кэшированному, но просроченному файлу, кешированный файл удаляется перед созданием нового оптимизированного изображения и кэшированием нового файла.
</p>
Срок действия (или, скорее, максимальный возраст) определяется <span className="spanTag">Cache-Control</span> заголовком вышестоящего сервера.
<p>Если <span className="spanTag">s-maxage</span> найдено в <span className="spanTag">Cache-Control</span>, то оно используется. Если <span className="spanTag">s-maxage</span> нет, то используется <span className="spanTag">max-age</span>. Если ничего не найдено, <span className="spanTag">max-age</span> используется 60 секунд.</p>
Вы можете настроить <span className="spanTag">deviceSizes</span> и <span className="spanTag">imageSizes</span> уменьшить общее количество возможных сгенерированных изображений.

<h2>Продвинутый</h2>
Следующая конфигурация предназначена для сложных случаев использования и обычно не требуется. Если вы решите настроить свойства ниже, вы переопределите любые изменения значений по умолчанию Next.js в будущих обновлениях.

<h3>Размеры устройства</h3>
В некоторых случаях, когда вы знаете ожидаемую ширину устройства от пользователей вашего веб-сайта, вы можете указать список контрольных точек ширины устройства с помощью <span className="spanTag">deviceSizes</span> свойства. Эти значения ширины используются, когда компонент <span className="spanTag">next/image</span> использует <span className="spanTag">layout="responsive"</span> или <span className="spanTag">layout="fill"</span> для того, чтобы правильное изображение отображалось для устройства, посещающего ваш веб-сайт.
<p>Если конфигурация не указана, используется значение по умолчанию, указанное ниже.</p>
<Highlight language="javascript">{`module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}`}</Highlight>

<h3>Размеры изображения</h3>
Вы можете указать список ширины изображения с помощью свойства <span className="spanTag">imageSizes</span>. Эти значения должны отличаться от значений (обычно меньше),  определенных в <span className="spanTag">deviceSizes</span>, поскольку массивы будут объединены. Эти значения ширины используются, когда компонент <span className="spanTag">next/image</span> использует <span className="spanTag">layout="fixed"</span> или <span className="spanTag">layout="intrinsic"</span>.
<p>Если конфигурация не указана, используется значение по умолчанию, указанное ниже.</p>

<Highlight language="javascript">{`module.exports = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}`}</Highlight>

            </div>
        </Docs>
    )
}