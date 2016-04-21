using System.IO;
using Autofac;
using dream.walker.reader;
using dream.walker.station.IoC;
using NUnit.Framework;

namespace dream.station.tests.FileReader
{
    [TestFixture]
    public class CompanyFileReaderTests
    {
        private ICompanyFileReader _sut;
        private static string _workingFolder = @"C:\Work\sergey-balaboskin\asp.net_4\app_walker\src\dream.walker.reader";

        [SetUp]
        public void Setup()
        {
            _sut = IoCContainer.Instance.Resolve<ICompanyFileReader>();
        }

        [Test]
        public void Read()
        {
            var path = Path.Combine(_workingFolder, "companylist.csv");
            var result = _sut.Read(path);
        }
    }
}
