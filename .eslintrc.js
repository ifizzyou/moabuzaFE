module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  plugins: ['prettier', 'no-param-reassign-allow-reduce'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types': 0,
    'no-extra-semi': 'error',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }], // 확장자로 js와 jsx ts tsx 허용하도록 수정
    // 'arrow-parens': ['warn', 'as-needed'], // 화살표 함수의 파라미터가 하나일때 괄호 생략
    'no-unused-vars': ['off'], // 사용하지 않는 변수가 있을때 빌드에러가 나던 규칙 해제
    'no-console': ['off'], // 콘솔을 쓰면 에러가 나던 규칙 해제
    'import/prefer-default-export': ['off'], // export const 문을 쓸때 에러를 내는 규칙 해제
    'react-hooks/exhaustive-deps': ['warn'], // hooks의 의존성배열이 충분하지 않을때 강제로 의존성을 추가하는 규칙을 완화
    'react/jsx-props-no-spreading': [1, { custom: 'ignore' }], // props spreading을 허용하지 않는 규칙 해제
    'linebreak-style': 0,
    'prettier/prettier': 0,
    'import/extensions': 0,
    'no-undef':0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'no-shadow': 0,
    'no-param-reassign': 0,
    'no-restricted-globals': 0,
    'no-nested-ternary': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-param-reassign-allow-reduce/allow-reduce': 2,
    'no-param-reassign-allow-reduce/no-reduce-identifiers': 2,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
}
