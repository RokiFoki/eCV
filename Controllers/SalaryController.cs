using eCv.ConfigurationModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace eCv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IMemoryCache _cache;
        private readonly CurrencyConfiguration _currencyConfig;
        public SalaryController(
            IHttpClientFactory clientFactory,
            IMemoryCache memoryCache,
            IOptions<CurrencyConfiguration> currencyConfig)
        {
            _clientFactory = clientFactory;
            _cache = memoryCache;
            _currencyConfig = currencyConfig.Value;
        }
        [HttpGet("currency-rates")]
        public async Task<CurrencyRateResult> CurrencyRates()
        {
            var client = _clientFactory.CreateClient();

            var usdEurTask = fetchUsdEur(client);
            var usdGbpTask = fetchUsdGbp(client);

            await Task.WhenAll(usdEurTask, usdGbpTask);

            return new CurrencyRateResult
            {
                UsdToEur = usdEurTask.Result.UsdToEur,
                UsdToGbp = usdGbpTask.Result.UsdToGbp
            };
        }


        private async Task<UsdEurResponse> fetchUsdEur(HttpClient client) 
        {
            UsdEurResponse result;
            if (!_cache.TryGetValue("USD_EUR", out result))
            {
                var response = await (await client.GetAsync($"https://free.currconv.com/api/v7/convert?q=USD_EUR&compact=ultra&apiKey={_currencyConfig.Key}")).Content.ReadAsStringAsync();

                try
                {
                    result = JsonSerializer.Deserialize<UsdEurResponse>(response);
                    _cache.Set("USD_EUR", result, new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(10)));
                } catch (Exception e)
                {
                    result = new UsdEurResponse
                    {
                        UsdToEur = 0.84M
                    };
                }
            }

            return result;            
        }

        private async Task<UsdGbpResponse> fetchUsdGbp(HttpClient client)
        {
            UsdGbpResponse result;
            if (!_cache.TryGetValue("USD_GBP", out result))
            {
                var response = await (await client.GetAsync($"https://free.currconv.com/api/v7/convert?q=USD_GBP&compact=ultra&apiKey={_currencyConfig.Key}")).Content.ReadAsStringAsync();

                try
                {
                    result = JsonSerializer.Deserialize<UsdGbpResponse>(response);
                    _cache.Set("USD_GBP", result, new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(10)));
                } catch (Exception e)
                {
                    result = new UsdGbpResponse
                    {
                        UsdToGbp = 0.72M
                    };
                }
            }

            return result;
        }

        public class UsdEurResponse
        {
            [JsonPropertyName("USD_EUR")]
            public decimal UsdToEur { get; set; }
        }

        public class UsdGbpResponse
        {
            [JsonPropertyName("USD_GBP")]
            public decimal UsdToGbp { get; set; }
        }

        public class CurrencyRateResult
        {
            public decimal UsdToEur { get; set; }
            public decimal UsdToGbp { get; set; }
        }
    }
}
