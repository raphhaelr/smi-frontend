import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(12rem, 14rem) 1fr',
      },
      colors: {
        header: '#232120',
        menuButton: '#F05123',
        orangeSmi: '#F05123',
        buttonTextCollor: '#f1f3f4',
        titleColor: '#232120',
        tableHeaderColor: 'rgba(134, 133, 134, 0.25)',
        tableBorderBottomColor: 'rgba(0, 0, 0, 0.25)',
        inputBorderColor: '#868586',
        inputPlaceholderColor: '#868586',
        activeStatusColor: 'rgba(13, 153, 255, 0.40)',
        inactiveStatusColor: 'rgba(240, 81, 35, 0.40)',
        finishedStatusColor: 'rgba(38, 192, 53, 0.40)',
        inputPlaceholderDemand: '#868586',
        plusButtonColor: 'rgba(240, 81, 35, 0.40)',
        selectColor: '#868586',
      },
      borderWidth: {
        commonInput: '1px',
      },
      borderRadius: {
        status: '3.1875rem',
      },
      boxShadow: {
        table: '0px 4px 8px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config
