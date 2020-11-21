import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Next.js CLI</h1>

Интерфейс командной строки Next.js позволяет запускать, создавать и экспортировать приложение.
<p>Чтобы получить список доступных команд CLI, выполните следующую команду в каталоге проекта:</p>


<Highlight language="node">
{`npx next -h`}
</Highlight>
<i>( npx поставляется с npm 5.2+ и выше)</i>
<p>Результат должен выглядеть так:</p>



<Highlight language="node">
{`Usage
  $ next <command>

Available commands
  build, start, export, dev, telemetry

Options
  --version, -v   Version number
  --help, -h      Displays this message

For more information run a command with the --help flag
  $ next build --help`}
</Highlight>

Вы можете передавать любые аргументы узла к nextкомандам:

<Highlight language="node">
{`NODE_OPTIONS='--throw-deprecation' next
NODE_OPTIONS='-r esm' next
NODE_OPTIONS='--inspect' next`}
</Highlight>

<h2>Построить</h2>
<p>next build создает оптимизированную производственную сборку вашего приложения. На выходе отображается информация о каждом маршруте.</p>

<p className="list">
 - Размер - количество ресурсов, загруженных при переходе на страницу на стороне клиента. Размер каждого маршрута включает только его зависимости.
</p>
<p className="list">
 - First Load JS - количество ресурсов, загруженных при посещении страницы с сервера. Общее количество JS-кода отображается как отдельный показатель.
</p>

Первая загрузка окрашена в зеленый, желтый или красный цвет. Стремитесь к экологичности для эффективных приложений.
<p>Вы можете включить производственное профилирование для React с --profile флагом в next build. Для этого требуется Next.js 9.5 :</p>


<Highlight language="node">
{`next build --profile`}
</Highlight>

После этого вы можете использовать профилировщик так же, как и при разработке.
<p>Вы можете включить более подробный вывод сборки с помощью --debug флага в next build. Для этого требуется Next.js 9.5.3:</p>


<Highlight language="node">
{`next build --debug`}
</Highlight>

Если этот флаг включен, будут отображаться дополнительные выходные данные сборки, такие как перезапись, перенаправление и заголовки.

<h2>Развитие</h2>

next dev запускает приложение в режиме разработки с перезагрузкой горячего кода, сообщением об ошибках и многим другим:
<p>По http://localhost:3000 умолчанию приложение запускается в. Порт по умолчанию можно изменить -p следующим образом:</p>


<Highlight language="node">
{`npx next dev -p 4000`}
</Highlight>

<h2>Производство</h2>

next startзапускает приложение в рабочем режиме. Приложение должно быть скомпилировано в next buildпервую очередь.
<p>По http://localhost:3000 умолчанию приложение запускается в. Порт по умолчанию можно изменить -p следующим образом:</p>


<Highlight language="node">
{`npx next start -p 4000`}
</Highlight>

<h2>Телеметрия</h2>

Next.js собирает полностью анонимные телеметрические данные об общем использовании. Участие в этой анонимной программе необязательно, и вы можете отказаться от участия, если не хотите делиться какой-либо информацией.

            </div>
        </Docs>
    )
}