using System.IO;
using System.Threading.Tasks;
using dream.walker.data.Models;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace dream.walker.data.Azure
{
    public class AzureStorageClient : IStorageClient
    {
        private readonly StorageAccountConfiguration _conifgruation;
        private readonly CloudBlobClient _blobClient;

        public AzureStorageClient(StorageAccountConfiguration conifgruation)
        {
            _conifgruation = conifgruation;
            _blobClient = InitializeClient();
        }

        protected CloudBlobClient InitializeClient()
        {
            var storageAccount = CloudStorageAccount.Parse(_conifgruation.ConnectionString);
            var client = storageAccount.CreateCloudBlobClient();
            return client;
        }

        protected void SetContainerPermission(CloudBlobContainer container, BlobContainerPublicAccessType perimssion)
        {
            container.SetPermissionsAsync(new BlobContainerPermissions
            {
                PublicAccess = perimssion
            });
        }

        protected async Task<CloudBlobContainer> GetContainer(BlobContainer container)
        {
            var blobContainer = _blobClient.GetContainerReference(container.ToString().ToLower());
            await blobContainer.CreateIfNotExistsAsync();

            return blobContainer;
        }

        public async Task<string> UploadFile(BlobContainer container, string fileName, string relativePath, Stream stream)
        {
            var blobContainer = await GetContainer(container);
            CloudBlockBlob blockBlob = blobContainer.GetBlockBlobReference($"{relativePath.ToLower()}/{fileName.ToLower()}");

            await blockBlob.UploadFromStreamAsync(stream);

            return
                $"http://{_conifgruation.AccountName.ToLower()}.blob.core.windows.net/{container.ToString().ToLower()}/{relativePath.ToLower()}/{fileName.ToLower()}";
        }

        public async Task DeleteFile(BlobContainer container, string resource)
        {
            var blobContainer = await GetContainer(container);
            CloudBlockBlob blockBlob = blobContainer.GetBlockBlobReference(resource);

            await blockBlob.DeleteAsync();
        }
    }

    public interface IStorageClient
    {
        Task<string> UploadFile(BlobContainer container, string fileName, string relativePath, Stream stream);
        Task DeleteFile(BlobContainer container, string resource);
    }
}
