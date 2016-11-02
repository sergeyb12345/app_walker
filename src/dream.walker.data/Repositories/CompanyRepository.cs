﻿using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities;
using dream.walker.data.Models;
using dream.walker.reader.Models;
using Newtonsoft.Json;

namespace dream.walker.data.Repositories
{
    public interface ICompanyRepository : IDreamDbRepository<Company>
    {
        Company Get(string ticker);
        List<CompanyToUpdate> FindCompaniesForUpdate(TimeSpan fromTimeAgo, int count);
        List<CompanyToProcess> FindCompaniesToProcess(TimeSpan fromTimeAgo, int count);
        List<CompanyToProcess> FindCompaniesToCalculate(int maxCompanyCount);
    }


    public class CompanyRepository : DreamDbRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public Company Get(string ticker)
        {
            var record = Dbset.FirstOrDefault(r => r.Ticker == ticker);
            return record;
        }

        public List<CompanyToUpdate> FindCompaniesForUpdate(TimeSpan fromTimeAgo, int count)
        {
            var fromDate = DateTime.Now.Subtract(fromTimeAgo).Date;
            var records = Dbset.Where(c => c.Filtered && c.LastUpdated < fromDate)
                .Select(c => new CompanyToUpdate
                {
                    Ticker = c.Ticker,
                    LastUpdated = c.LastUpdated,
                    HistoryQuotesJson = c.HistoryQuotesJson
                })
                .OrderBy(c => c.Ticker)
                .Take(count)
                .ToList();

            return records;
        }

        public List<CompanyToProcess> FindCompaniesToProcess(TimeSpan fromTimeAgo, int count)
        {
            var fromDate = DateTime.Now.Subtract(fromTimeAgo).Date;
            var records = Dbset
                .Where(c => c.Filtered && c.LastCalculated < fromDate)
                .OrderBy(c => c.Ticker)
                .Take(count)
                .Select(c =>
                    new CompanyToProcess
                    {
                        Ticker = c.Ticker,
                        LastCalculated = c.LastCalculated,
                        LastUpdated = c.LastUpdated,
                        QuotesJson = c.HistoryQuotesJson
                    })
                .ToList();

            return records;
        }

        public List<CompanyToProcess> FindCompaniesToCalculate(int maxCompanyCount)
        {
            var sql = $@"
                SELECT TOP {maxCompanyCount}  C.*
                FROM dbo.Company C
                WHERE C.LastCalculated < C.LastUpdated AND C.Filtered = 1";

            var companies = Dbset.SqlQuery(sql)
                .Select(c =>
                new CompanyToProcess
                {
                    Ticker = c.Ticker,
                    LastCalculated = c.LastCalculated,
                    LastUpdated = c.LastUpdated,
                    QuotesJson = c.HistoryQuotesJson
                }).ToList();

            return companies;
        }
    }
}
