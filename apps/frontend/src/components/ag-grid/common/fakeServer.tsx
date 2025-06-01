import alasql from 'alasql'

interface SortModel {
    colId: string
    sort: 'asc' | 'desc'
}

interface Request {
    [x: string]: any
    startRow?: number
    endRow?: number
    sortModel: SortModel[]
}

interface FakeServerResponse {
    success: boolean
    rows: any[]
    lastRow: number
}

export function FakeServer(allData: any[]) {
    alasql.options.cache = false

    return {
        getData(request: Request): FakeServerResponse {
            const results = executeQuery(request)
            return {
                success: true,
                rows: results as any[],
                lastRow: getLastRowIndex(request),
            }
        },
    }

    function executeQuery(request: Request) {
        const sql = buildSql(request)
        console.log('[FakeServer] - about to execute query:', sql)
        return alasql(sql, [allData])
    }

    function buildSql(request: Request): string {
        return 'SELECT * FROM ?' + whereSql(request) + orderBySql(request) + limitSql(request)
    }

    function whereSql(request: Request) {
        const whereParts: any[] = []
        const filterModel = request.filterModel

        if (filterModel) {
            Object.keys(filterModel).forEach(function (key) {
                const item = filterModel[key]

                switch (item.filterType) {
                    case 'text':
                        whereParts.push(createFilterSql(textFilterMapper, key, item))
                        break
                    case 'number':
                        whereParts.push(createFilterSql(numberFilterMapper, key, item))
                        break
                    default:
                        console.log('unknown filter type: ' + item.filterType)
                        break
                }
            })
        }

        if (whereParts.length > 0) {
            return ' WHERE ' + whereParts.join(' AND ')
        }

        return ''
    }

    function createFilterSql(mapper: { (key: any, item: any): string | undefined; (key: any, item: any): string | undefined; (arg0: any, arg1: any): any }, key: string, item: { operator: string; conditions: any[] }) {
        if (item.operator) {
            const conditions = item.conditions.map((condition: any) => mapper(key, condition))

            return '(' + conditions.join(' ' + item.operator + ' ') + ')'
        }

        return mapper(key, item)
    }

    function textFilterMapper(key: string, item: { type: string; filter: string }) {
        switch (item.type) {
            case 'equals':
                return key + " = '" + item.filter + "'"
            case 'notEqual':
                return key + " != '" + item.filter + "'"
            case 'contains':
                return key + " LIKE '%" + item.filter + "%'"
            case 'notContains':
                return key + " NOT LIKE '%" + item.filter + "%'"
            case 'startsWith':
                return key + " LIKE '" + item.filter + "%'"
            case 'endsWith':
                return key + " LIKE '%" + item.filter + "'"
            case 'blank':
                return key + ' IS NULL or ' + key + " = ''"
            case 'notBlank':
                return key + ' IS NOT NULL and ' + key + " != ''"
            default:
                console.log('unknown text filter type: ' + item.type)
        }
    }

    function numberFilterMapper(key: string, item: { type: string; filter: string; filterTo: string }) {
        switch (item.type) {
            case 'equals':
                return key + ' = ' + item.filter
            case 'notEqual':
                return key + ' != ' + item.filter
            case 'greaterThan':
                return key + ' > ' + item.filter
            case 'greaterThanOrEqual':
                return key + ' >= ' + item.filter
            case 'lessThan':
                return key + ' < ' + item.filter
            case 'lessThanOrEqual':
                return key + ' <= ' + item.filter
            case 'inRange':
                return '(' + key + ' >= ' + item.filter + ' and ' + key + ' <= ' + item.filterTo + ')'
            case 'blank':
                return key + ' IS NULL'
            case 'notBlank':
                return key + ' IS NOT NULL'
            default:
                console.log('unknown number filter type: ' + item.type)
        }
    }

    function orderBySql(request: Request) {
        const sortModel = request.sortModel

        if (sortModel.length === 0) return ''

        const sorts = sortModel.map(function (s: { colId: string; sort: string }) {
            return s.colId + ' ' + s.sort.toUpperCase()
        })

        return ' ORDER BY ' + sorts.join(', ')
    }

    function limitSql(request: Request) {
        if (request.endRow === undefined || request.startRow === undefined) {
            return ''
        }
        const blockSize = request.endRow - request.startRow

        return ' LIMIT ' + blockSize + ' OFFSET ' + request.startRow
    }

    function getLastRowIndex(request: Request): number {
        const fullResults = executeQuery({ ...request, startRow: undefined, endRow: undefined }) as any[]
        return fullResults.length
    }
}
