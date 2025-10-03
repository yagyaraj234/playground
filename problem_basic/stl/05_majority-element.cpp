#include <iostream>
#include <unordered_map>

using namespace std;

int findMajorityElement(vector<int> v)
{
    unordered_map<int, int> up;

    int len = v.size();

    int result = 0;

    for (int i = 0; i < v.size(); i++)
    {
        up[v[i]]++;
    }

    for (const auto &pair : up)
    {
        if (pair.second > len / 2)
        {
            result = pair.first;
        }
    }

    return result;
}

int main()
{

    vector<int> v1 = {2, 2, 1, 1, 1, 2, 2,1,1,1};
    vector<int> v2 = {3, 2, 3};

    cout << "resutl of 1 " << findMajorityElement(v1) << endl;
    cout << "resutl of 2 " << findMajorityElement(v2) << endl;
    return 0;
}