import { Endpoint, HttpMethod, HttpStatus } from '../../types/enums';
import type {
    ErrorHandler,
    IGetRequestParams,
    ILoaderConfig,
    IRequestOptions,
    ResponseCallback,
} from '../../types/app';
import type { TNewsApiResponse } from '../../types/news-api';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<IRequestOptions>;
    private readonly handleError: ErrorHandler = (error: unknown): void => {
        console.error(error instanceof Error ? error.message : String(error));
    };

    public constructor(config: Readonly<ILoaderConfig>) {
        this.baseLink = config.baseLink;
        this.options = config.options;
    }

    public getResp<TResponse extends TNewsApiResponse>(
        params: IGetRequestParams,
        callback: ResponseCallback<TResponse> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        void this.load<TResponse>(HttpMethod.Get, params.endpoint, callback, params.options ?? {});
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            if (response.status === HttpStatus.Unauthorized || response.status === HttpStatus.NotFound) {
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            }

            throw Error(response.statusText);
        }

        return response;
    }

    private makeUrl(options: Partial<IRequestOptions>, endpoint: Endpoint): string {
        const urlOptions: Partial<IRequestOptions> = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as Array<keyof IRequestOptions>).forEach((key: keyof IRequestOptions): void => {
            const value: string | undefined = urlOptions[key];

            if (value !== undefined) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    private async load<TResponse extends TNewsApiResponse>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: ResponseCallback<TResponse>,
        options: Partial<IRequestOptions> = {}
    ): Promise<void> {
        try {
            const response: Response = await fetch(this.makeUrl(options, endpoint), { method });
            const checkedResponse: Response = this.errorHandler(response);
            const data: unknown = await checkedResponse.json();

            callback(data as TResponse);
        } catch (error: unknown) {
            this.handleError(error);
        }
    }
}

export default Loader;
