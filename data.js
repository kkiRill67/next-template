export const lists = [
    {
        id: '/docs/getting-started',
        name: `Установка`,
        show: false
      },
      {
        id: '/docs/basic-features',
        name: 'Базовый синтаксис',
        show: true,
        links: [
          {
            id: '/docs/basic-features/pages',
            name: `Страницы`
          },
          {
            id: '/docs/basic-features/data-fetching',
            name: `Получение данных`
          },
          {
            id: '/docs/basic-features/built-in-css-support',
            name: `Встроенная поддержка CSS`
          },
          {
            id: '/docs/basic-features/fast-refresh',
            name: `Быстрое обновление`
          },
          {
            id: '/docs/basic-features/static-file-serving',
            name: `Обслуживание статических файлов`
          },
          {
            id: '/docs/basic-features/typescript',
            name: `TypeScript`
          },
          {
            id: '/docs/basic-features/environment-variables',
            name: `Переменное окружение`
          },
          {
            id: '/docs/basic-features/supported-browsers-features',
            name: `Поддерживаемые браузеры и функции`
          }
        ]
      },
      {
        id: '/docs/routing',
        name: `Маршрутизация`,
        show: true,
        links: [
          {
            id: '/docs/routing/introduction',
            name: `Введение`
          },
          {
            id: '/docs/routing/dynamic-routes',
            name: `Динамические маршруты`
          },
          {
            id: '/docs/routing/imperatively',
            name: `Императивно`
          },
          {
            id: '/docs/routing/shallow-routing',
            name: `Мелкая маршрутизация`
          }
        ]
      },
      {
        id: '/docs/api-routes',
        name: `API-маршруты`,
        show: true,
        links: [
          {
            id: '/docs/api-routes/introduction',
            name: `Введение`
          },
          {
            id: '/docs/api-routes/dynamic-api-routes',
            name: `Динамические маршруты API`
          },
          {
            id: '/docs/api-routes/api-middlewares',
            name: `API Middlewares`
          },
          {
            id: '/docs/api-routes/response-helpers',
            name: `Помощники ответа`
          }
        ]
      },
      {
        id: '/docs/deployment',
        name: `Развертывание`,
        show: false
      },
      {
        id: '/docs/advanced-features',
        name: `Расширенные возможности`,
        show: true,
        links: [
          {
            id: '/docs/advanced-features/preview-mode',
            name: `Режим предварительного просмотра`
          },
          {
            id: '/docs/advanced-features/dynamic-import',
            name: `Динамический импорт`
          },
          {
            id: '/docs/advanced-features/automatic-static-optimization',
            name: `Автоматическая статическая оптимизация`
          },
          {
            id: '/docs/advanced-features/static-html-export',
            name: `Статический экспорт HTML`
          },
          {
            id: '/docs/advanced-features/module-path-aliases',
            name: `Абсолютный импорт и псевдо пути к модулю`
          },
          {
            id: '/docs/advanced-features/customizing-babel-config',
            name: `Настройка Babel Config`
          },
          {
            id: '/docs/advanced-features/customizing-postcss-config',
            name: `Настройка PostCSS Config`
          },
          {
            id: '/docs/advanced-features/custom-server',
            name: `Пользовательский сервер`
          },
          {
            id: '/docs/advanced-features/custom-app',
            name: `Пользовательский \`App\``
          },
          {
            id: '/docs/advanced-features/custom-document',
            name: `Пользовательский \`Document\``
          },
          {
            id: '/docs/advanced-features/custom-error-page',
            name: `Пользовательская страница ошибки (404)`
          },
          {
            id: '/docs/advanced-features/src-directory',
            name: `Директория \`src\``
          },
          {
            id: '/docs/advanced-features/multi-zones',
            name: `Мульти Зоны`
          },
          {
            id: '/docs/advanced-features/measuring-performance',
            name: `Измерение производительности`
          },
          {
            id: '/docs/advanced-features/debugging',
            name: `Отладка`
          },
          {
            id: '/docs/advanced-features/codemods',
            name: `Next.js Codemods`
          }
        ]
      },
      {
        id: '/docs/upgrading',
        name: `Руководство по обновлению`,
        show: false
      }
]