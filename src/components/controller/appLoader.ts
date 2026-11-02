import Loader from './loader';
import type { ILoaderConfig } from '../../types/app';

class AppLoader extends Loader {
    public constructor() {
        const config: Readonly<ILoaderConfig> = {
            baseLink: process.env.API_URL ?? '',
            options: {
                apiKey: process.env.API_KEY ?? '',
            },
        };

        super(config);
    }
}

export default AppLoader;
