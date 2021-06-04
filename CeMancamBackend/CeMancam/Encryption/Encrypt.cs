using CeMancam.Models;
using System.IO;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace CeMancam.Encryption
{
    public class Encrypt
    {
        private readonly AppSettings _appSettings;

        public Encrypt(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        public async Task<byte[]> Action(byte[] strData)
        {
            PasswordDeriveBytes passbytes =
            new PasswordDeriveBytes(_appSettings.Encrypt_Secret,
            new byte[] { Parameters.bytePermutation1,
                         Parameters.bytePermutation2,
                         Parameters.bytePermutation3,
                         Parameters.bytePermutation4
            });

            MemoryStream memstream = new MemoryStream();
            Aes aes = new AesManaged();
            aes.Key = passbytes.GetBytes(aes.KeySize / 8);
            aes.IV = passbytes.GetBytes(aes.BlockSize / 8);

            CryptoStream cryptostream = new CryptoStream(memstream,
            aes.CreateEncryptor(), CryptoStreamMode.Write);
            cryptostream.Write(strData, 0, strData.Length);
            cryptostream.Close();
            return memstream.ToArray();
        }
    }
}
