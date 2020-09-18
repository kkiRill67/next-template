import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Настройка PostCSS Config</h1>
                <h2>Поведение по умолчанию</h2>

Next.js компилирует CSS для своей встроенной поддержки CSS с помощью PostCSS.

<p>Из коробки, без настройки, Next.js компилирует CSS со следующими преобразованиями:</p>

<p className="list">
1. Autoprefixer автоматически добавляет префиксы поставщиков к правилам CSS (обратно в IE11).
</p>
<p className="list">
2. Ошибки кроссбраузерности Flexbox исправлены, чтобы вести себя как в спецификации .
</p>
<p className="list">
3. Новые функции CSS автоматически компилируются для совместимости с Internet Explorer 11:
</p>

<p className="list">
 - all Свойство
</p>
<p className="list">
 - Свойства разрыва
</p>
<p className="list">
 - font-variant Свойство
</p>
<p className="list">
 - Свойства зазора
</p>
<p className="list">
 - Диапазоны медиа-запросов
</p>

По умолчанию сетка CSS и настраиваемые свойства (переменные CSS) не компилируются для поддержки IE11.
<p>
Чтобы скомпилировать CSS Grid Layout для IE11, вы можете разместить следующий комментарий в верхней части файла CSS:
</p>

<Highlight language="css">
{`/* autoprefixer grid: autoplace */`}
</Highlight>

Вы также можете включить поддержку IE11 для CSS Grid Layout во всем своем проекте, настроив autoprefixer с конфигурацией, показанной ниже (свернуто). См. «Настройка плагинов» ниже для получения дополнительной информации.
<p></p>
<div className="note">
Конфигурация для включения макета сетки CSS:


<Highlight language="json">
{`{
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009",
          "grid": "autoplace"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ]
  ]
}`}
</Highlight>
</div>



Переменные CSS не компилируются, потому что это невозможно сделать безопасно . Если вы должны использовать переменные, подумайте об использовании чего-то вроде переменных Sass, которые скомпилированы Sass .

<h2>Настройка целевых браузеров</h2>

Next.js позволяет настроить целевые браузеры (для Autoprefixer и скомпилированные функции CSS) через Browserslist .
<p>
Чтобы настроить список браузеров, создайте browserslist ключ package.json примерно так:
</p>

<Highlight language="json">
{`{
  "browserslist": [">0.3%", "not ie 11", "not dead", "not op_mini all"]
}`}
</Highlight>

Вы можете использовать инструмент browserl.ist , чтобы визуализировать, на какие браузеры вы ориентируетесь.

<h2>Модули CSS</h2>

Для поддержки модулей CSS настройка не требуется. Чтобы включить модули CSS для файла, переименуйте файл, чтобы он имел расширение .module.css.
<p>
Вы можете узнать больше о поддержке CSS-модуля Next.js здесь.
</p>

<h2>Настройка плагинов</h2>
<div className="note">
Предупреждение: Когда вы определяете пользовательский файл конфигурации PostCSS, Next.js полностью отключает поведение по умолчанию. Не забудьте вручную настроить все скомпилированные функции, включая Autoprefixer. Кроме того, необходимо установить все плагины, включенные в пользовательской конфигурации вручную, то есть npm install postcss-flexbugs-fixes postcss-preset-env.
</div>

Чтобы настроить конфигурацию PostCSS, создайте postcss.config.json файл в корне вашего проекта.
<p>Это конфигурация по умолчанию, используемая Next.js:</p>

<Highlight language="json">
{`{
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ]
  ]
}`}
</Highlight>

<div className="note">
Примечание. Next.js также позволяет присвоить файлу имя .postcssrc.json или прочитать его с помощью postcss ключа package.json.
</div>
<p>
Также можно настроить PostCSS с помощью postcss.config.js файла, что полезно, когда вы хотите условно включить плагины в зависимости от среды:
</p>

<Highlight language="javascript">
{`module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
              features: {
                'custom-properties': false,
              },
            },
          ],
        ]
      : [
          // No transformations in development
        ],
}`}
</Highlight>

<div className="note">
Примечание . Next.js также позволяет давать файлу имя .postcssrc.js.
</div>

Не используйтеrequire() для импорта подключаемые модули PostCSS. Плагины должны быть предоставлены в виде строк.
<p></p>
<div className="note">
Примечание. Если вам postcss.config.js необходимо поддерживать другие инструменты, не относящиеся к Next.js, в том же проекте, вы должны использовать вместо этого совместимый объектно-ориентированный формат:

  <Highlight language="javascript">
{`module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
  },
}`}
</Highlight>  
</div>




            </div>
        </Docs>
    )
}