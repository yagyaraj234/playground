#include<iostream>
#include<vector>

using namespace std;


vector<int> merge(vector<int> a,vector<int> b){
    int i = 0;
    int j = 0;
    vector<int> v;

    while (i < a.size() &&  j<b.size())
    {
       if(a[i]<b[j]){
           v.push_back(a[i]);
           i++;
       }else{
           v.push_back(b[j]);
           j++;
       }
    }

   while (i < a.size()) {
    v.push_back(a[i]);
    i++;
}

while (j < b.size()) {
    v.push_back(b[j]);
    j++;
}

    return v;
}

vector<int> mergeSort(vector<int> arr){

    int n = arr.size();
    if (n <= 1) return arr;

    int mid = n / 2;
    vector<int> leftArray(arr.begin(), arr.begin() + mid);

    // pass from mid to end
    vector<int> rightArray(arr.begin() + mid, arr.end());

    leftArray = mergeSort(leftArray);
    rightArray = mergeSort(rightArray);

    vector<int> result(leftArray.size() + rightArray.size());

    return merge(leftArray, rightArray);
}

int main(){

    vector<int> v = {1, 35, 34, 3, 53, 25};

    vector<int> result = mergeSort(v);

    for (int i = 0; i < result.size();i++){
        cout << " " << result[i];
    }
}