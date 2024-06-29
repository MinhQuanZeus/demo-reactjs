module.exports = {
  plugins: [],
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: "sass-resources-loader",
                options: {
                  // Provide path to the file with resources
                  resources: "./src/styles/variables.scss",
                },
              },
            ],
          },
        ],
      },
    },
  },
  jest: {
    configure: {
      setupFilesAfterEnv: ["<rootDir>/src/mockAntd.tsx"],
    },
  },
};
