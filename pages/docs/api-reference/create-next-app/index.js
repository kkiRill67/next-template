import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Создать следующее приложение</h1>
            
Самый простой способ начать работу с Next.js - использовать <span className="spanTag">create-next-app</span>. Этот простой инструмент CLI позволяет быстро приступить к созданию нового приложения Next.js со всем настроенным для вас. Вы можете создать новое приложение, используя шаблон Next.js по умолчанию, или с помощью одного из официальных примеров Next.js. Для начала используйте следующую команду:

<Highlight language="node">
{`npx create-next-app
# or
yarn create next-app`}
</Highlight>

<h2>Параметры</h2>
<span className="spanTag">create-next-app</span> поставляется со следующими опциями:
<p className="list"> - <strong>-e, --example [name] | [github-url]</strong> - пример для начальной загрузки приложения. Вы можете использовать пример имени из репозитория Next.js или URL-адреса GitHub. URL-адрес может использовать любую ветку и/или подкаталог.</p>
<p className="list"> - <strong>--example-path [path-to-example]</strong> - В редких случаях ваш URL-адрес GitHub может содержать имя ветки с косой чертой (например, bug/fix-1) и путь к примеру (например, foo/bar). В этом случае необходимо указать путь к примеру отдельно: <span className="spanTag">--example-path foo/bar</span></p>

<h2>Зачем использовать приложение Create Next App?</h2>

<span className="spanTag">create-next-app</span> позволяет создать новое приложение Next.js за секунды. Он официально поддерживается создателями Next.js и имеет ряд преимуществ:
<p className="list"> - Интерактивный опыт: <strong>npx create-next-app</strong> запуск (без аргументов) запускает интерактивный интерфейс, который поможет вам настроить проект.</p>
<p className="list"> - Отсутствие зависимостей: инициализация проекта занимает всего одну секунду. Create Next App не имеет никаких зависимостей.</p>
<p className="list"> - Автономная поддержка: Create Next App автоматически определит, если вы находитесь в автономном режиме, и загрузит ваш проект, используя локальный кеш пакетов.</p>
<p className="list"> - Поддержка примеров: Create Next App может загружать ваше приложение, используя пример из коллекции примеров Next.js (например <strong>npx create-next-app --example api-routes</strong>).</p>
<p className="list"> - Протестировано: пакет является частью монорепозитория Next.js и протестирован с использованием того же набора интеграционных тестов, что и сам Next.js, что гарантирует его правильную работу с каждым выпуском.</p>

            </div>
        </Docs>
    )
}