module.exports = (sequelize, Sequelize) => {
    const Dataset = sequelize.define("dataset", {
      short_name: {
        type: Sequelize.STRING,
      },
      long_name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      data_provider: {
        type: Sequelize.STRING,
      },
      data_source_url: {
        type: Sequelize.STRING,
      },
      data_download_url: {
        type: Sequelize.STRING,
      },
      login_credentials_required: {
        type: Sequelize.BOOLEAN,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      API_key: {
        type: Sequelize.STRING,
      },
      download_method: {
        type: Sequelize.STRING,
      },
      download_file_prefix: {
        type: Sequelize.STRING,
      },
      download_file_infix: {
        type: Sequelize.STRING,
      },
      download_file_suffix: {
        type: Sequelize.STRING,
      },
      download_file_type: {
        type: Sequelize.STRING,
      },
      download_directory: {
        type: Sequelize.STRING,
      },
      download_frequency: {
        type: Sequelize.STRING,
      },
      subset: {
        type: Sequelize.BOOLEAN,
      },
      subset_region: {
        type: Sequelize.STRING,
      }
    });
    return Dataset;
}