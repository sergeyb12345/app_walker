using System;

namespace dream.walker.data.Requests
{
    public class FindCompaniesForUpdateRequest
    {
        public TimeSpan FromTimeAgo { get; set; }
        public int MaxRecordCount { get; set; }
    }
}