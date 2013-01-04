module Main
  class App < Sinatra::Base
    dir = File.dirname(File.expand_path(__FILE__))

    set :public_folder, "#{dir}/frontend/public"
    set :static, true

    get '/' do
      haml :index
    end
  end
end