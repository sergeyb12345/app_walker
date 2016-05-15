using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using dream.walker.stock.Enums;
using dream.walker.stock.Requests;

namespace dream.walker.stock.Nasdaq.Client
{
    public class NasdaqStockClient : IMarketStockClient
    {
        private readonly HttpClient _client;

        public NasdaqStockClient(NasdaqStockClientConfig config)
        {
            if (!string.IsNullOrWhiteSpace(config.Proxy))
            {
                var handler = new HttpClientHandler
                {
                    Proxy = new WebProxy(config.Proxy, false, new string[] {}),
                    UseProxy = !string.IsNullOrWhiteSpace(config.Proxy)
                };

                _client = new HttpClient(handler);
            }
            else
            {
                _client = new HttpClient();
            }
            _client.BaseAddress = new Uri(config.BaseUrl);
        }


        public async Task<string> GetStockHistory(GetStockHistoryRequest request)
        {
            var message = BuildRequestMessage(request);
            var response = await _client.SendAsync(message);

            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        #region BuildRequestMessage 

        private HttpRequestMessage BuildRequestMessage(GetStockHistoryRequest request)
        {
            var resourceUrl = $"symbol/{request.Ticker.ToLower()}/historical";

            HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Post, resourceUrl);
            requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("text/html"));
            requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xhtml+xml"));
            requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("*/*"));
            requestMessage.Headers.Referrer = new Uri(Path.Combine(_client.BaseAddress.AbsoluteUri, resourceUrl));
            requestMessage.Headers.AcceptLanguage.Add(new StringWithQualityHeaderValue("en-GB", 0.8));
            requestMessage.Headers.AcceptLanguage.Add(new StringWithQualityHeaderValue("ru", 0.8));
            requestMessage.Headers.AcceptLanguage.Add(new StringWithQualityHeaderValue("en-US", 0.5));
            requestMessage.Headers.AcceptLanguage.Add(new StringWithQualityHeaderValue("en", 0.3));
            string content = BuildMessageContent(request);

            requestMessage.Content = new StringContent(content);
            requestMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            return requestMessage;
        }

        private string BuildMessageContent(GetStockHistoryRequest request)
        {
            var timeFrame = "y";
            switch (request.TimeFrame)
            {
                case QuoteTimeFrame.Month:
                    timeFrame = "m";
                    break;
                case QuoteTimeFrame.Day:
                    timeFrame = "d";
                    break;
                case QuoteTimeFrame.Year:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            return
                $@"__VIEWSTATE=XZrs0K3CLAQik%2B9%2FBOhqgzAu7AhSyzuIPlnviIYDraD9QdIJSo66MxkIWaIalgteK%2FjHBtc7rDr30HU44miTqa1z8cjPBNrr3CqxTGaT0xhET3TsmEh6o8AE2YMCXPwKzly0FhTZeZmrLT%2B%2BJ%2BBv%2F3dBBodNYSRs4HGe37Xny3GBMQ5qJ8lwJhyxMiybjfrblSClVGt8DjPJEJfLcPSJoCE2uSjSv24XMTS32CRhmmSen%2F00EQDWPNwa2xP1Drjt%2BznOhnR1x%2FPZUcCZq6rH8C5kOmczDyErER38S7BJLOoPDa78bIEFeE3nPXln8EPyKq9354xTTw4u2u3kklYdXYkz7V9QWLjSIRv4r15Hq5MpB02i9xE%2FFLZUk6Rx94W4E0p7J1WpHAh%2B9gMdafOhhNdmojnG94sy7YWTz1nbm5oTjwsj0cf5yA8Ol27huS%2BvYNwDCBbEezuNvwLed%2Fcd4%2FLt0l9B9zrl7INugqcoVQQ%2F0rI3rkhTJRVTt0ZOHOEjij%2BPGb%2BFoNMQVR0DmYK%2B4qysHQnybf747pr2Lolt530MiHEwi%2ByMmOHms4Im%2FsP3ZtujLasSJdpxpvYjoJXa8j2biqh3Zg1KYN78J%2BOCMIWkXJ4XmztgR0YlwvwpJIkKb%2FhP5%2B1mTHcTHUehKjXG7e2c8fsnfKxIYABJx97xxNuLKY%2Bxjc37%2BEewFAldM1VTseAQoenfv8Y5pcc85ZsjXaDsngiVpq35h079lJPvBvdgLaR%2BmKHzoKAtVG%2BzYsmz5K5nTugO5QbTz9RD1HyGdqQBi4aRb0DVEZaoWmxxjqw9nv12jeg5v2SUCW6cualEnFzX0614HxTcX2gjTBcI8qpZ1G8LioadqoZKoGL023OpFjM6KM8Yz6PPlDrcjSjpYDpLTdlyCgetZMrHf5qiPBIpLj7Fv8ScQ9YA0PqxQwywBODoaQBRMG5%2Foo1hC4NtUFjiYr3orVxvEyvLBjozsX7woCHUwAevXlsbjlbxw%2F2GHDcxEfORCatJMK%2BZTr8TfxpMxXoKoQGyO%2BuSJW8pgNlwVMR9OqGhsqgVg2lgS9bxc0bE0XPAEekfLqmwbjgjG7jFZAG4YtDbdXzyKurcOsL%2F8teozA%2BR1e04T6vwoSLEMszZty7km5TMlODaE4zr6f9BTZMXXVno68TdTHJewDQhUuOSo5AXZGdjvCKfcI%2BvyuCnJMD2rx9%2FAPPkpi%2FsUb2GJ67UX7dW1NG2dWOaBYkkmU3sEDmvuF6Md39CKpIqSzDnxwpMbdjN%2BOflCqQJfa9VwkG2FQ4s0dBOIiVaUNuKWQx5DcS9oQWkNcitM6VMQsiJ4G%2Byls1IZxa0gJLk5KmNOMIdVp%2BTu55ZRSdCPtd%2BGhs0jjp6lNGfUYS58poODvI3ZESha64mqB4hk7o88Sz%2BBGkomCtrcPNVJYmT4iI2MRfa551LP%2FN%2B73w6cdJvHCqF7XHc3dR%2FBCpIf2p2wnpEID5IzCyN3BuOG9fLQjLMlkGxKFY9GR4bC9aivEQC%2B2kzFMKqvFTb6uFFUXduh2dAc9BJ6tEixnvuKLmW7QLF48TMhbeajFyWyyE2am0E%2FJYhwb2bPFcEws%2FSGxv0GGYA5pUSi6keBP1%2BMy3739eA9gZ%2FE8Lsaev%2F9VMGW5Tmv18TJo%2B%2FX7B0tK1unxLK7lW5pUeLKI%2FijxCv9obEDLYRUOjWFynwRPeteP%2FjhHNRnq0RM2XYPJQpagLpsUye2X2JGI3Eh7OIkh5awwwd8kfOBFPIKC3yfD4DlVEaKDqi1YwUFpxo%2FehSD5J1G8g6k31yznP9YKTeFTWWSrRr0dTXHosfEG5RgyRITyicd39WkQkpS3mXKlYxjg6Sgmi%2B2FzQoKtjxsXUaDCqITaZAd4j33u9kM8Ft8DeQoFuJyXBbU7GKuhthpzBoZdaY7O479eNyDKAgUm7zaubl2ERXk6%2FLZgl1cZFngpZULPL1EzQf6mrD06eTzf2t%2Fc2vErwTVdIu%2FS9VlVYiymstsdDvwvuVYqmGZ3k0o4C2lB9ZdroZig14DKcVUXOEy1DYe8pHL7GrFvhSvdOwGnu8%2Br1ZeThmxGdWB63j5n%2BqFRXIzlLVwYRYOePGFzKvvEj8kVMOS03qqGUDvz9Iv4Mk4Xxb8fVSMZcPrMgqdfnTRalf0WEKlfqSDJe5yBo%2Fx1J1FqVOVihY8ndM7m7noIUydNoFq7BEG4YPOdt1%2FkXOu2sK07etwwkFgvigx5FWHENkJcNhhL8b2MK6%2ByQ3fD750qqXDcFCKz2juRQxnWDMA%2FP91HsuTBqH1vA0uScH6a%2BsMWyaF1CTqXV00NLUc%2BJOutt2vNpS%2FQGxMVaURcwPBOg48choLoJeOi%2FaDXj2ayLO%2Bqt6prVasLioFHwIbKGJ2U46raAQiie5WjHSs3jSfGj%2BZ8Uu3qHLx%2BYd%2BjTbGD0a%2F5AYXBlGxBPoEtnE6xmZ8lriImdYaQ1CrzSjLokZhpRcMSofqtTn3p5yPfu4Hd06%2FJ1YxeF3USJ1rxDTExQDUvIU3PBxi64UmrHNg7dmLtFNy0woQpqyu0gRNbwla%2BTc%2F3XhUi93VWm3O2FXVh9crkb75cKBP%2FdS5YK4ms2t2trcov10FT5Wzp13LwURdLFzio6Qb6rAPSgERfi9uFRTD%2Fg%2Fb4sxyJgnPHxE94SrixVXazQlbbxaxHMS%2BIyzcoJ2q6sKgC2RojUKS2NhyGmNasz959gnOsLp5xr2oOmrO3F7p6LxaLSTB%2BWZXza3EzAy8aBner%2B9CWIBARhdZ1QYgP5x2Q9CHLM%2ByZ8zJ9zddhZHV9jzvtHsNTfSpIkZXGFXSDujzZ0maxssugYD%2BmyjnA8Lh6OwxARupBlLWwj6%2FTDcqnhgbEQEkcN%2BM189sbsWVKU4uemyahnW7NA%2Fz6PbEHDLH8yNduvLKRaMDZtmvnp8AQJDuYhdV6mcyfna45r1jBsYf34afWBiJ9lrPux0b%2F2XIrLU51RTmdkWnuD7CHgjKmABcHRLKIybligk4NkA%2FV5SV6DdBbXLTuYNz8kMSQ1jbGCKe2RTDg1DvyDIgwQsq8si7bHlaIDo7UE%2BObsUTlux20xtP6hyHbZ6MhZg4HWzSQTDWNUXffCtA%2BVuKsxcznh6poRjdnb1XZhgeByk3%2FgjQ3dult7dtiM19ieJnx8s107F6gK5AK1Q4tUmvI%2FH8jcVfPQGJlLE234R7qXAslUZumhSZlHtqi%2Fa0435AhBu9YITr2nCdYJ0z1pda4cJmXXkjP%2BwVySZKzWSXCwGuq1g%2F9ZJYGZl3qtIkvVm05NNAMMwdjFVoSaddY5t4U%2Ftlq%2FXD13HJt%2BrMpZmvSaKwPn%2FTIqO9aAPp8Q1Rxdt4hEzejW5NLns7z7i4An3mVAo%2Bbao5Tsl3gxEpWv4lWeC4jkR5p16IlFgFzqUfGN4U%2BgRraXsrXGJTw9Z%2BawIJsZpxtm1rn15XNa%2FIl00Ecstpbu8EXFmnDJzh2op7%2FLWEFYHTNrbbwKR4GoIgiBM2DAJeP1J6aBv6%2Bn%2Fsn4zcjk8aZrG7hEwgrF8VWm7VGDyxv1Z9zu7MlnZEYmgsz66nzGPCtY4nZLISv4%2FsAOsyiWF%2FXW8c17YNq0BEkNg8lkA6QjAJySfVnlH23u4MhheojbOzIe3U8W6IJOy8HHEHz%2FYMlOg3cpGWkRitID%2BsjAGymVNzb64HyRircmVttygl8rBPdMVlhGlWzTduZOeusqT9NY2K4nWgtkYqb48jlLtYGiidyDfBlUGlgDqJsLa9GA3JMMGL72IFLP%2Bl%2B4NltaSzh%2B1Qs2qtGSTOH%2FP%2BX1bBmKqqoP9XOpj1b8NsrQcXz9DtJuGkAQXYQhz1blb%2BDCbllMbG2tgTghLjGmE84sdoH1qgG3WkJec4%2BPCFtNuEaTPI4rLyiuww9njlzR17JpjQJdXroFjNarepDwey7nK2ri4dKVHOWrGlNKOpTtUuFNucUK7ahIocMAdqzvYc95v9%2FdJT8Tl95LeOXxYtrNSklZhW0YyfAljhG8qW98eRNx0%2BUqQEDHA0BaiY1vBhozcxNiGhqR7VdIYvHzScdHd8KKBIkZD0DbWXE3EI4LRYS3kyBWrxHpGTXuGrNj%2BZN0r55lzR5g0e%2Fmjzi3nmBVIrtA2xC5EUy6Os%2F4V5QZ9LqJ%2Fj3DrhcYQwhWYVopsXtu3UC5OgkG7IqO4uy8cx196lLclwoO7E5edqXklpY%2Bd5Y%2FVCOhSh6fqi1lhYR1J84uCsfaX4CcoRLYn1t5%2B%2F6SA92HJ9CXB1IWRTHDtXPA%2FujS408TMPCjds77NvG4ZXeEtWsMMSUA%2FsS5oITI3obfziCzDR1t2sdr2Hsgc1G7A2ZIX7rtfJ1YOvvDXOYxVRr%2BPAOjoysTWVEXCHrBjaEhF14JGVT9nftTqosKaaCSrV%2FTEn6qe2%2FfxJyxOmC%2F8bTz9NwQR06pNK%2FEUByL%2BdFCeGhfMei6qfDOUveYYHCr3OcUw9q%2B%2B%2FfHI8QXIKJUZhnKadpD%2FZ34TkY60Gyyn9iXlINUcfZY6gakKS8EeZEuKhs%2FxIgbnWVZcTYYfWU2Q9N80mN1EId23Nq%2FFeuQRE8xKjAn317u1VzRNchzVNe%2FixURahXo1wLPRGBQIx79IKjAVVPxItej2ljGJWQUZa4ReguxGdOQS5U1hWAtYf%2BLbBXfZwGF1JENMW%2FWanpMFJQ8hnBeHD83%2B9FDepngtgfx06Rm%2BCJ08X0ydpKf4FwU0TJV62rjlKyfe2xzs1aWbLc5gGFmaNPaG4QY1D%2FkdHUdFxGQ%2BZiYxAxat4ylCY1CqzWbbfQjUdh%2F2VsoWDtc9KbmW32QrV1SI7qjEb5XWOx3wsbXt%2Bf%2BkOZvQm%2FAhgRWuAnQe6Zc8YI9U5gKIs0vUYYHlULVqZVlpGb1klcfzpVlX7sdBccYr4lTDmlS9gWivItrYFOO49bMEAXxpAvY4B6GIT2o90Jfij%2BucpVlJ%2BXcTG7NZ3aya1L4Uk24WwXeGbyWAKKVP15jwqGtLyk3dqpFs%2B06DsLpvu8XI5Ilu%2FyDLrxcE0vcfMYyyWF6IzPxSLXMZFy8UJuFDrCKOLf0E8jp1VxH7T4OSq0cGm7Lh5DrgXpIFpLjMFSfqQKxUM32A9bzw2zqbu7a%2BbJgCUV0czLmDmZy6WLzmbiT6a9VQWoZh641K964ELQALR1i1CqlmNFmwiTLAMucOWeP6S9vk6dQG0D20w7OnCs59nBJ%2BQdaojzCX7qR7nnVKUNbxk7yzgEL6MDugq3uy%2FDASNR3G02qac0dt%2BfdCAxHD6uO1DKCNe3QfqAUxg55ErketR0dblyxQGARTFfxNix5zeuXDKopFx%2FRbJZIMqRKU030yzYBHGKothZFd6eVRaU3X%2BmQfQj28AhhXrJs44PKYQ4AwMvE3lJplf1Xb1FMEcK7S2oDjR%2FC7Jzlm5THi4srgHsirNGUa1xxEgGOHyGl7bIXLqN%2FYw2kkPMmxpizv9jXcflxHqGddaNj9yCO0V0oxnh1J%2B1g8eniMkJZEdNDUOZP4YXJcXjBjU97VvlBK%2BT2E2%2BIGo%2B%2BQYnHpKIyJxW3LMJDxc%2FP4DDtu87%2B0BKkKZRJKV%2FICdIt&__VIEWSTATEGENERATOR=87BE3BDB&__VIEWSTATEENCRYPTED=&__EVENTVALIDATION=VEkuZo2SeOu%2FnD6j9HLbGqFRgn64%2FASvJe4A%2F2bBQZJEYAvhmTKtRI8ZzltP4OFS9mbehJ4lK5HMuQEndw4xLqGpg1FlBvG7W9hqdK6FM4c2DB7QgSr0nj1a58AwdlnR&ctl00%24quotes_content_left%24submitString={
                    request.TimeFrameValue}{timeFrame}%7Ctrue%7C{request.Ticker.ToUpper().Trim()}";
        }

        #endregion

    }
}
